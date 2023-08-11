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
    pub call_ids: Vec<Address>,
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

        // get call ids as vec of Addresses
        let call_ids = env::var("FUNCTION_CALL_IDS").unwrap_or(String::new());
        let call_ids: Vec<Vec<u8>> = serde_json::from_str(&call_ids).unwrap_or_default();
        let call_ids: Vec<Address> = call_ids
            .iter()
            .map(|c| Address::from_slice(c.as_slice()))
            .collect();

        Ok(Self {
            function_id,
            enclave_wallet,
            signer,
            verifying_contract,
            params,
            call_ids,
            chain_id: chain_id.parse().unwrap_or(1),
        })
    }

    pub fn get_result<T: JsonRpcClient>(
        &self,
        to: Address,
        expiration_time_seconds: U256,
        gas_limit: U256,
        calls: Vec<ContractCall<EVMMiddleware<T>, ()>>, // vector of instructions to call
        call_ids: Vec<Address>,
    ) -> Result<FunctionResult, SwitchboardClientError> {
        // get map of call_id to index in calls
        let call_id_map: std::collections::HashMap<Address, usize> = self
            .call_ids
            .iter()
            .enumerate()
            .map(|(i, c)| (c.clone(), i))
            .collect();

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

        // Only get the checksums for params at index of passed in call_ids using call_id_map
        let checksums = call_ids
            .iter()
            .map(|c| {
                let index = call_id_map.get(c).unwrap();
                ethers::utils::keccak256(self.params[*index].clone())
                    .as_slice()
                    .to_vec()
            })
            .collect();

        let chain_result_info = ChainResultInfo::Evm(EVMFunctionResult {
            txs: evm_txns.clone(),
            signatures: signatures.iter().map(|s| s.to_vec()).collect(),
            call_ids: call_ids.iter().map(|c| c.as_bytes().to_vec()).collect(),
            checksums,
        });

        let quote_raw =
            Gramine::generate_quote(&self.enclave_wallet.address().as_bytes()).unwrap_or_default();

        if quote_raw.len() == 0 {
            println!(
                "WARNING: Error generating quote. This is likely due to the enclave not being initialized."
            )
        }

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

    pub fn params<T: AbiDecode>(&self) -> Vec<(Result<T, SwitchboardClientError>, Address)> {
        // params and matching call_ids
        self.params
            .iter()
            .zip(self.call_ids.clone())
            .map(|(p, c)| {
                (
                    T::decode(p.as_slice()).map_err(|e| SwitchboardClientError::CustomError {
                        message: "failed to parse function param".to_string(),
                        source: Arc::new(e),
                    }),
                    c,
                )
            })
            .collect()
    }

    // Emit the function result
    // This will trigger the switchboard verifier and trigger the submission of the
    // passed in meta-transactions (funded by the switchboard function escrow).
    pub fn emit<T: JsonRpcClient>(
        &self,
        to: Address,
        expiration_time_seconds: U256,
        gas_limit: U256,
        calls: Vec<ContractCall<EVMMiddleware<T>, ()>>, // vector of instructions to call
    ) -> Result<(), SwitchboardClientError> {
        self.get_result(
            to,
            expiration_time_seconds,
            gas_limit,
            calls,
            self.call_ids.clone(),
        )
        .map_err(|e| SwitchboardClientError::CustomError {
            message: "failed to run function verify".to_string(),
            source: Arc::new(e),
        })
        .unwrap()
        .emit();
        Ok(())
    }

    // Emit but resolve a subset of call_ids corresponding to some parameters
    // This is useful for when you want to resolve a subset of the calls (allowing for 1 run per 1 call)
    pub fn emit_resolve<T: JsonRpcClient>(
        &self,
        to: Address,
        expiration_time_seconds: U256,
        gas_limit: U256,
        calls: Vec<ContractCall<EVMMiddleware<T>, ()>>, // vector of instructions to call
        call_ids: Vec<Address>,
    ) -> Result<(), SwitchboardClientError> {
        self.get_result(to, expiration_time_seconds, gas_limit, calls, call_ids)
            .map_err(|e| SwitchboardClientError::CustomError {
                message: "failed to run function resolve".to_string(),
                source: Arc::new(e),
            })
            .unwrap()
            .emit();
        Ok(())
    }
}
