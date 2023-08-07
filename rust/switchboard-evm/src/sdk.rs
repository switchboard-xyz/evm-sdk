use std::env;
use std::sync::Arc;

use ethers::abi::AbiDecode;
use ethers::prelude::k256::ecdsa::SigningKey;
use ethers::prelude::{ContractCall, SignerMiddleware};
use ethers::providers::{JsonRpcClient, Provider};
use ethers::signers::{Signer, Wallet};
use ethers::types::{Address, Bytes, U256};
use serde_json;
use switchboard_common::{
    ChainResultInfo, EVMFunctionResult, EvmTransaction, FunctionResult, Gramine,
};

use crate::bindings::error::SwitchboardClientError;
use crate::bindings::{eip712, switchboard};
use crate::utils::{generate_signer, load_env_address};

pub type EVMMiddleware<T> = SignerMiddleware<Provider<T>, Wallet<SigningKey>>;

#[derive(Clone)]
pub struct EVMFunctionRunner {
    pub function_id: Address,
    pub enclave_wallet: Wallet<SigningKey>,
    pub signer: Address,
    pub verifying_contract: Address,
    pub chain_id: u64,
    pub params: Vec<Vec<u8>>,
}

impl std::fmt::Display for EVMFunctionRunner {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "SwitchboardFunctionRunner: signer: {}, verifying_contract: {}, function_id: {}",
            self.signer,
            self.verifying_contract.to_string(),
            self.function_id.to_string(),
        )
    }
}

impl EVMFunctionRunner {
    pub fn new() -> Result<EVMFunctionRunner, SwitchboardClientError> {
        let enclave_wallet = generate_signer();
        let signer = enclave_wallet.address();
        let chain_id = env::var("CHAIN_ID").unwrap();
        let verifying_contract = load_env_address("VERIFYING_CONTRACT")?;
        let function_id = load_env_address("FUNCTION_KEY")?;

        let params = env::var("FUNCTION_PARAMS").unwrap_or(String::new());
        let params: Vec<Vec<u8>> = serde_json::from_str(&params).unwrap_or_default();

        Ok(Self {
            function_id,
            enclave_wallet,
            signer,
            verifying_contract,
            params,
            chain_id: chain_id.parse().unwrap_or(1),
        })
    }

    pub fn get_result<T: JsonRpcClient>(
        &self,
        to: Address,
        expiration_time_seconds: U256,
        gas_limit: U256,
        calls: Vec<ContractCall<EVMMiddleware<T>, ()>>, // vector of instructions to call
    ) -> Result<FunctionResult, SwitchboardClientError> {
        let (evm_txns, signatures): (Vec<EvmTransaction>, Vec<Bytes>) = calls
            .iter()
            .map(|c| {
                // TODO: gas limit should be moved to function settings on-chain
                let transaction = switchboard::Transaction {
                    expiration_time_seconds,
                    gas_limit,
                    value: U256::from(0),
                    to: c.tx.from().unwrap_or(&to).clone(),
                    from: self.enclave_wallet.address(),
                    data: c.tx.data().unwrap().clone(),
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
                    data: c.tx.data().unwrap().clone().to_vec(),
                    from: self.enclave_wallet.address().as_bytes().to_vec(),
                    to: c.tx.from().unwrap_or(&to).clone().as_bytes().to_vec(),
                    value: c.tx.value().unwrap_or(&U256::from(0)).to_string(),
                };

                (
                    evm_txn,
                    Bytes::from(
                        self.enclave_wallet
                            .sign_hash(ethers::types::H256::from(eip712_hash))
                            .unwrap()
                            .to_vec(),
                    ),
                )
            })
            .unzip();

        // get call ids
        let call_ids = env::var("FUNCTION_CALL_IDS").unwrap_or(String::new());
        let call_ids: Vec<Vec<u8>> = serde_json::from_str(&call_ids).unwrap_or_default();

        // get checksums
        // @TODO: Add this back in and check result in qvn
        let checksums = self
            .params
            .clone()
            .iter() // get keccak hash of each param
            .map(|p| ethers::utils::keccak256(p).as_slice().to_vec())
            .collect();

        let chain_result_info = ChainResultInfo::Evm(EVMFunctionResult {
            txs: evm_txns.clone(),
            signatures: signatures.iter().map(|s| s.to_vec()).collect(),
            call_ids,
            checksums,
        });
        let quote_raw =
            Gramine::generate_quote(&self.enclave_wallet.address().as_bytes()).unwrap_or_default();

        let fn_request_key = if self.params.len() != 0 {
            let request_key = load_env_address("FUNCTION_REQUEST_KEY").unwrap_or_default();
            request_key.as_bytes().to_vec()
        } else {
            Vec::new()
        };

        Ok(FunctionResult {
            version: 1,
            quote: quote_raw,
            fn_key: self.function_id.as_bytes().to_vec(),
            signer: self.enclave_wallet.address().as_bytes().to_vec(),
            fn_request_key: fn_request_key,
            fn_request_hash: Vec::new(),
            chain_result_info,
        })
    }

    pub fn params<T: AbiDecode>(&self) -> Vec<T> {
        // turn params into a vector of T
        self.params
            .iter()
            .map(|p| T::decode(p.as_slice()).unwrap())
            .collect()
    }

    pub fn emit<T: JsonRpcClient>(
        &self,
        to: Address,
        expiration_time_seconds: U256,
        gas_limit: U256,
        calls: Vec<ContractCall<EVMMiddleware<T>, ()>>, // vector of instructions to call
    ) -> Result<(), SwitchboardClientError> {
        self.get_result(to, expiration_time_seconds, gas_limit, calls)
            .map_err(|e| SwitchboardClientError::CustomError {
                message: "failed to run function verify".to_string(),
                source: Arc::new(e),
            })
            .unwrap()
            .emit();
        Ok(())
    }
}
