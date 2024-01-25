use crate::*;

use std::collections::HashMap;
use std::env;
use std::str::FromStr;
use std::sync::Arc;

use base64;
use base64::engine::general_purpose::STANDARD as BASE64;
use base64::engine::Engine as _;
use ethers::prelude::{k256::ecdsa::SigningKey, ContractCall, SignerMiddleware};
use ethers::providers::{Http, Provider};
use ethers::signers::{Signer, Wallet};
use ethers::types::{Address, Bytes, U256};
use ethers::utils::hex;
use nom::AsBytes;
use serde_json;

use crate::bindings::{eip712, switchboard};
use crate::utils::{generate_signer, load_env_address};

pub type EVMMiddleware<T> = SignerMiddleware<Provider<T>, Wallet<SigningKey>>;

/// EVM specific environment used during a Switchboard function execution
#[derive(Clone)]
pub struct EvmFunctionRunner {
    /// `FUNCTION_KEY`: environemnt variable passed in that denoted what function
    /// is executing
    pub function_id: Address,
    /// This is a keypair generated inside the function execution runtime.
    /// As long as not explicitly exported, this keypair will never be known
    /// outside the functions exectuion environment.
    pub enclave_wallet: Wallet<SigningKey>,
    pub signer: Address,
    /// `VERIFYING_CONTRACT`: An environmnet variable denoting the signoff
    /// callback program ID. On evm chains this is equivalent to the Switchboard
    /// program address.
    pub verifying_contract: Address,
    /// `CHAIN_ID`: The chain ID of the chain this evm function is executing on
    pub chain_id: u64,
    /// A list of function parameter based calls to attempt to handle this run.
    /// Parsing these is up to the function.
    pub params: Vec<Vec<u8>>,
    /// `FUNCTION_CALL_IDS`: A list of the UUIDs of all the calls the function
    /// will be attempting to resolve.
    /// Routines OR Requests are represented in call_ids
    pub call_ids: Vec<Address>,
    /// A derived url based on the CHAIN_ID that can be used for basic querying
    /// of the target chain through the default public rpc.
    pub default_provider_url: Option<String>,
    pub call_id_map: HashMap<Address, usize>,
    // Map of call_id to error code
    pub call_id_error_map: HashMap<Address, u8>,
    // Map of call_id to Transaction and Signature
    pub call_id_tx_map: HashMap<Address, Vec<ContractCall<EVMMiddleware<Http>, ()>>>,
}

impl std::fmt::Display for EvmFunctionRunner {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "SwitchboardFunctionRunner: signer: {}, verifying_contract: {}, function_id: {}",
            self.signer, self.verifying_contract, self.function_id,
        )
    }
}

impl EvmFunctionRunner {
    pub fn new() -> Result<EvmFunctionRunner, SbError> {
        let enclave_wallet = generate_signer();
        let signer = enclave_wallet.address();
        let chain_id_string = env::var("CHAIN_ID").unwrap();
        let chain_id: u64 = chain_id_string.parse().unwrap_or(1);
        let verifying_contract = load_env_address("VERIFYING_CONTRACT")?;
        let function_id = load_env_address("FUNCTION_KEY")?;

        let params = BASE64.decode(env::var("FUNCTION_PARAMS").unwrap()).unwrap();
        let params: Vec<String> = serde_json::from_slice(&params).unwrap();
        let params: Vec<Vec<u8>> = params.iter().map(|p| BASE64.decode(p).unwrap()).collect();

        // get call ids as vec of Addresses
        let call_ids = BASE64
            .decode(env::var("FUNCTION_CALL_IDS").unwrap())
            .unwrap();
        let call_ids: Vec<String> = serde_json::from_slice(&call_ids).unwrap();
        let call_ids: Vec<Address> = call_ids
            .iter()
            .map(|c| Address::from_str(c.as_str()).unwrap())
            .collect();

        // get map of call_id to index in calls
        let call_id_map: std::collections::HashMap<Address, usize> =
            call_ids.iter().enumerate().map(|(i, c)| (*c, i)).collect();

        let default_provider_url = match chain_id {
            // CoreDAO
            1116 => Some("https://rpc.coredao.org".to_string()),
            1115 => Some("https://rpc.test.btcs.network".to_string()),
            // Arbitrum
            42161 => Some("https://arb1.arbitrum.io/rpc".to_string()),
            421613 => Some("https://goerli-rollup.arbitrum.io/rpc".to_string()),
            // Base
            8453 => Some("https://mainnet.base.org".to_string()),
            84531 => Some("https://goerli.base.org".to_string()),
            // Optimism
            10 => Some("https://mainnet.optimism.io".to_string()),
            420 => Some("https://goerli.optimism.io".to_string()),
            // Panic
            _ => None,
        };

        Ok(Self {
            function_id,
            enclave_wallet,
            signer,
            verifying_contract,
            params,
            call_ids,
            chain_id,
            default_provider_url,
            call_id_map,
            call_id_error_map: HashMap::new(),
            call_id_tx_map: HashMap::new(),
        })
    }

    /// Creates a provider to communicate with the target chain
    pub fn get_provider(&self, provider_url: Option<&str>) -> Result<Provider<Http>, SbError> {
        if let Some(url) = provider_url {
            return Provider::<Http>::try_from(url).map_err(|e| SbError::CustomError {
                message: "Failed to create provider".to_string(),
                source: std::sync::Arc::new(e),
            });
        }

        self.get_default_provider()
    }

    /// Creates a default provider to communicate with the target chain
    pub fn get_default_provider(&self) -> Result<Provider<Http>, SbError> {
        if let Some(url) = self.default_provider_url.as_ref() {
            return Provider::<Http>::try_from(url).map_err(|e| SbError::CustomError {
                message: "Failed to create provider".to_string(),
                source: std::sync::Arc::new(e),
            });
        }

        Err(SbError::CustomMessage(format!(
            "No default provider found for chain_id {}",
            self.chain_id
        )))
    }

    /// Creates a rpc client from the provided url and the enclave signer
    pub async fn get_client(
        &self,
        provider_url: Option<&str>,
    ) -> Result<Arc<EVMMiddleware<Http>>, SbError> {
        let provider = self.get_provider(provider_url)?;

        let client = SignerMiddleware::new_with_provider_chain(
            provider.clone(),
            self.enclave_wallet.clone(),
        )
        .await
        .map_err(|e| SbError::CustomError {
            message: "Failed to create client".to_string(),
            source: std::sync::Arc::new(e),
        })?;

        Ok(Arc::new(client))
    }

    /// Creates a FunctionResult object as the output of your function run.
    /// The `calls` passed here will be verified and executed by the switchboard network.
    pub fn get_result(
        &self,
        expiration_time_seconds: U256,
        gas_limit: U256,
    ) -> Result<FunctionResult, SwitchboardClientError> {
        // create a vector of each field to pass to the function result
        let mut evm_txns: Vec<EvmTransaction> = Vec::new();
        let mut call_ids: Vec<Address> = Vec::new();
        let mut signatures: Vec<Bytes> = Vec::new();
        let mut error_codes: Vec<u8> = Vec::new();
        let mut checksums: Vec<String> = Vec::new();

        // Fill the runs that were successful
        for (call_id, call_vec) in self.call_id_tx_map.iter() {
            // get calls from call_vec and add them to the right fields
            for call in call_vec.iter() {
                // get the to address from the call
                let to_name = call.tx.to().expect("Transaction field `to` must be set");
                let to_as_address = to_name
                    .as_address()
                    .expect("'to' must be an address, ens names not supported");

                // build the switchboard::Transaction for the signature
                let transaction = switchboard::Transaction {
                    expiration_time_seconds,
                    gas_limit,
                    value: *call.tx.value().unwrap_or(&U256::from(0)),
                    to: *to_as_address,
                    from: self.enclave_wallet.address(),
                    data: call.tx.data().unwrap().clone(),
                };

                let eip712_hash = eip712::get_transaction_hash(
                    "Switchboard".to_string(),
                    "0.0.1".to_string(),
                    self.chain_id,
                    self.verifying_contract,
                    transaction,
                )
                .unwrap();

                // build the EvmTransaction for the EvmFunctionResultV1
                let evm_txn = EvmTransaction {
                    expiration_time_seconds: expiration_time_seconds.as_u64(),
                    gas_limit: gas_limit.to_string(),
                    data: call.tx.data().unwrap_or(&Bytes::new()).as_bytes().into(),
                    from: self.enclave_wallet.address().as_bytes().to_vec(),
                    to: to_as_address.as_bytes().to_vec(),
                    value: call.tx.value().unwrap_or(&U256::from(0)).to_string(),
                };

                // get the index of the call_id in the call_ids vector so we can grab the params and get the aligned checksum
                let index = self.call_id_map.get(call_id).unwrap();
                let checksum = hex::encode(ethers::utils::keccak256(self.params[*index].clone()));

                // push the transaction and signature to the evm_txns and signatures vectors also push call_id to call_ids
                evm_txns.push(evm_txn);
                call_ids.push(call_id.clone());
                signatures.push(Bytes::from(
                    self.enclave_wallet
                        .sign_hash(ethers::types::H256::from(eip712_hash))
                        .unwrap()
                        .to_vec(),
                ));
                error_codes.push(0);
                checksums.push(checksum);
            }
        }

        // Fill the Error Runs
        for (call_id, error_code) in self.call_id_error_map.iter() {
            let index = self.call_id_map.get(call_id).unwrap();
            let checksum = hex::encode(ethers::utils::keccak256(self.params[*index].clone()));

            // create a dummy transaction and signature for the error
            let transaction = switchboard::Transaction {
                expiration_time_seconds,
                gas_limit,
                value: U256::from(0),
                to: Address::zero(),
                from: self.enclave_wallet.address(),
                data: Bytes::new(),
            };

            let eip712_hash = eip712::get_transaction_hash(
                "Switchboard".to_string(),
                "0.0.1".to_string(),
                self.chain_id,
                self.verifying_contract,
                transaction,
            )
            .unwrap();

            let evm_txn = EvmTransaction {
                expiration_time_seconds: expiration_time_seconds.as_u64(),
                gas_limit: gas_limit.to_string(),
                data: vec![],
                from: self.enclave_wallet.address().as_bytes().to_vec(),
                to: Address::zero().as_bytes().to_vec(),
                value: 0u8.to_string(),
            };

            // push the transaction and signature to the evm_txns and signatures vectors also push call_id to call_ids
            evm_txns.push(evm_txn);
            call_ids.push(call_id.clone());
            signatures.push(Bytes::from(
                self.enclave_wallet
                    .sign_hash(ethers::types::H256::from(eip712_hash))
                    .unwrap()
                    .to_vec(),
            ));
            error_codes.push(*error_code);
            checksums.push(checksum);
        }

        let evm_function_result = EvmFunctionResultV1 {
            function_id: format!("{:?}", self.function_id),
            signer: format!("{:?}", self.enclave_wallet.address()),
            txs: evm_txns.clone(),
            signatures: signatures.iter().map(|s| s.to_string()).collect(),
            resolved_ids: call_ids.iter().map(|c| format!("{:?}", c)).collect(),
            checksums,
            error_codes,
        };

        let hash = evm_function_result.hash();
        let chain_result_info = ChainResultInfo::Evm(switchboard_common::EvmFunctionResult::V1(
            evm_function_result,
        ));

        let quote_raw =
            Gramine::generate_quote(self.enclave_wallet.address().as_bytes()).unwrap_or_default();

        if quote_raw.is_empty() {
            println!(
                "WARNING: Error generating quote. This is likely due to the enclave not being initialized."
            )
        }

        // get hash as [u8; 32] from Vec<u8>
        let hash: [u8; 32] = hash.as_slice().try_into().unwrap();

        // get signature of hash
        let signature = self
            .enclave_wallet
            .sign_hash(ethers::types::H256::from(hash))
            .unwrap();

        Ok(switchboard_common::FunctionResult::V1(
            switchboard_common::FunctionResultV1 {
                quote: quote_raw,
                chain_result_info,
                error_code: 0,
                signer: self.enclave_wallet.address().as_bytes().to_vec(),
                signature: signature.into(),
            },
        ))
    }

    /// Emit the function result
    /// This will trigger the switchboard verifier and trigger the submission of the
    /// passed in meta-transactions (funded by the switchboard function escrow).
    pub fn emit(
        &self,
        expiration_time_seconds: U256,
        gas_limit: U256,
    ) -> Result<(), SwitchboardClientError> {
        self.get_result(expiration_time_seconds, gas_limit)
            .map_err(|e| SbError::CustomError {
                message: "failed to run function verify".to_string(),
                source: Arc::new(e),
            })
            .unwrap()
            .emit();
        Ok(())
    }

    // Emit error for all calls received by the function
    pub fn emit_error(
        &self,
        error_code: u8,
        expiration_time_seconds: U256,
        gas_limit: U256,
    ) -> Result<(), SwitchboardClientError> {
        let function_result = self
            .get_result(expiration_time_seconds, gas_limit)
            .map_err(|e| SwitchboardClientError::CustomError {
                message: "failed to run function resolve".to_string(),
                source: Arc::new(e),
            })
            .unwrap();

        // get V1 enum variant from FunctionResult
        let mut function_result_v1 = match function_result {
            FunctionResult::V1(v1) => v1,
            _ => {
                return Err(SwitchboardClientError::CustomMessage(
                    "Function result must be V1.".to_string(),
                ));
            }
        };

        // set error code (which will represent a function failure, not necessarily a call failure)
        function_result_v1.error_code = error_code;

        // wrap in FunctionResult enum variant
        let function_result = FunctionResult::V1(function_result_v1);
        function_result.emit();
        Ok(())
    }

    // assign error code to a call_id
    pub fn set_error(&mut self, resolved_id: Address, error_code: u8) {
        self.call_id_error_map.insert(resolved_id, error_code);
    }

    // assign transactions to a call_id
    pub fn set_txs(
        &mut self,
        resolved_id: Address,
        transactions: Vec<ContractCall<EVMMiddleware<Http>, ()>>,
    ) {
        self.call_id_tx_map.insert(resolved_id, transactions);
    }
}

pub async fn fetch_measurements(
    provider_url: &str,
    switchboard_address: Address,
    function_id: Address,
) -> Result<Vec<[u8; 32]>, SbError> {
    let provider = Provider::<Http>::try_from(provider_url).map_err(|e| SbError::CustomError {
        message: "Failed to create provider".to_string(),
        source: std::sync::Arc::new(e),
    })?;
    let client = SignerMiddleware::new_with_provider_chain(provider.clone(), generate_signer())
        .await
        .map_err(|e| SbError::CustomError {
            message: "Failed to create client".to_string(),
            source: std::sync::Arc::new(e),
        })?;

    // get switchboard contract
    let contract = switchboard::Switchboard::new(switchboard_address, Arc::new(client.clone()));

    // get user function
    let mr_enclaves = contract
        .get_function_mr_enclaves(function_id)
        .call()
        .await
        .map_err(|e| SbError::CustomError {
            message: "Failed to get function mr_enclaves".to_string(),
            source: std::sync::Arc::new(e),
        })
        .unwrap_or_default();

    // get enclave's measurement
    Ok(mr_enclaves)
}
