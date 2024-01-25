//! Switchboard is a multi-chain, permissionless oracle protocol providing
//! verifiable off-chain compute for smart contracts.
//!
//! This library provides the ethers-rs [`bindings`] for interacting and operating
//! Switchboard, along side the [`EvmFunctionRunner`] to write custom Switchboard
//! Functions.
//!
//! Here's an example of using the EvmFunctionRunner inside a Switchboard Function:
//!
//! ```
//! use rust_decimal::Decimal;
//! use chrono::Utc;
//! use serde::Deserialize;
//!
//! // Generate your contract's ABI
//! abigen!(Receiver, r#"[ function callback(int256, uint256) ]"#,);
//!
//! #[derive(Debug, Deserialize)]
//! pub struct DeribitRespnseInner {
//!     pub mark_iv: f64,
//!     pub timestamp: u64,
//! }
//!
//! #[derive(Debug, Deserialize)]
//! pub struct DeribitResponse {
//!     pub result: DeribitRespnseInner,
//! }
//!
//! #[tokio::main(worker_threads = 12)]
//! async fn main() -> Result<(), Box<dyn std::error::Error>> {
//!     // --- Initialize clients ---
//!     let function_runner = EvmFunctionRunner::new()?;
//!     let client = function_runner.get_client(None).await?;
//!
//!     let receiver: Address = env!("EXAMPLE_PROGRAM").parse()?;
//!     let receiver_contract = Receiver::new(receiver, client.into());

//!     // --- Logic Below ---
//!     let url = "https://www.deribit.com/api/v2/public/get_order_book?instrument_name=ETH-29SEP23-2000-C";
//!     let derebit_response: DeribitResponse = reqwest::get(url).await?.json().await?;

//!     let timestamp = derebit_response.result.timestamp.into();
//!     let mut mark_iv = Decimal::from_f64(derebit_response.result.mark_iv).unwrap();
//!     mark_iv.rescale(8);

//!     // --- Send the callback to the contract with Switchboard verification ---
//!     let callback = receiver_contract.callback(mark_iv.mantissa().into(), timestamp);
//!     let expiration = (Utc::now().timestamp() + 120).into();
//!     let gas_limit = 5_500_000.into();
//!     function_runner.emit(receiver, expiration, gas_limit, vec![callback])?;
//!     Ok(())
//! }
//! ```

pub mod bindings;
pub mod sdk;
pub mod utils;
pub use switchboard_common::*;
pub mod secrets;
pub use secrets::*;
pub mod test;
use ethers::prelude::*;
pub use sb_macros::*;
pub use test::*;

pub type FnCall = FunctionCall<
    std::sync::Arc<SignerMiddleware<Provider<Http>, Wallet<ecdsa::SigningKey<k256::Secp256k1>>>>,
    SignerMiddleware<Provider<Http>, Wallet<ecdsa::SigningKey<k256::Secp256k1>>>,
    (),
>;
pub type SbMiddleware =
    SignerMiddleware<Provider<Http>, Wallet<ecdsa::SigningKey<k256::Secp256k1>>>;

/// The Switchboard contract ABI with the included facets.
pub const SWITCHBOARD_ABI: &str = std::include_str!("../Switchboard.json");

/// The Switchboard Push Receiver contract ABI with the included facets.
pub const SWITCHBOARD_PUSH_RECEIVER_ABI: &str =
    std::include_str!("../SwitchboardPushReceiver.json");

pub use switchboard_common::{
    ChainResultInfo, EvmFunctionResult, EvmTransaction, FunctionResult, Gramine,
    SbError as SwitchboardClientError,
};

// pub type FnCall<M, S> = FunctionCall<Arc<SignerMiddleware<M, S>>, SignerMiddleware<M, S>, ()>;

pub trait SbFunctionParameters {
    fn decode(data: &[u8]) -> Option<Self>
    where
        Self: Sized;
}

#[derive(Clone, Copy, Debug, Default)]
pub struct NoParams;
impl SbFunctionParameters for NoParams {
    fn decode(_data: &[u8]) -> Option<Self>
    where
        Self: Sized,
    {
        Some(Self {})
    }
}

//#[cfg(test)]

// @TODO: update this test / finish inline ierc20 call
// mod tests {
//     use std::env;
//     use std::sync::Arc;

//     use ethers::prelude::{abigen, ContractCall};
//     use ethers::signers::Signer;
//     use ethers::types::transaction::eip712::EIP712Domain;
//     use ethers::types::Address;

//     use ethers::{
//         prelude::{k256::ecdsa::SigningKey, SignerMiddleware},
//         providers::{Http, Middleware, Provider},
//         signers::{LocalWallet, Wallet},
//         // types::Address,
//     };

//     use crate::sdk::{EvmFunctionRunner, EVMMiddleware};

//     use super::*;

//     #[tokio::test]
//     async fn test_function_result() {
//         std::env::set_var("CHAIN_ID", "421613"); // arb Goerli testnet
//         std::env::set_var(
//             "VERIFYING_CONTRACT",
//             "0x8b8F944F8506db8A91f85A31A956b165259C617F",
//         ); // SB arb testnet contract
//         std::env::set_var(
//             "TARGET_CONTRACT",
//             "0xcD016103a3d6aeD82b19B99f766ef0444a09000c",
//         );
//         // set the gas limit and expiration
//         let gas_limit = 1000000;
//         let expiration_time_seconds = 60;

//         // create a client, wallet and middleware. This is just so we can create the contract instance and sign the txn.
//         let client = Provider::<Http>::try_from("https://goerli-rollup.arbitrum.io/rpc").unwrap();
//         let wallet: Wallet<SigningKey> =
//             "725fd1619b2653b7ff1806bf29ae11d0568606d83777afd5b1f2e649bd5132a9"
//                 .parse::<LocalWallet>()
//                 .unwrap()
//                 .with_chain_id(client.get_chainid().await.unwrap().as_u64());

//         // your target contract address
//         let contract_address = "0xcD016103a3d6aeD82b19B99f766ef0444a09000c"
//             .parse::<ethers::types::Address>()
//             .unwrap();
//         abigen!(
//             SBTEST,
//             r#"[
//                 function totalSupply() external view returns (uint256)
//                 function balanceOf(address account) external view returns (uint256)
//                 function transfer(address recipient, uint256 amount) external returns (bool)
//                 function allowance(address owner, address spender) external view returns (uint256)
//                 function approve(address spender, uint256 amount) external returns (bool)
//                 function transferFrom( address sender, address recipient, uint256 amount) external returns (bool)
//                 event Transfer(address indexed from, address indexed to, uint256 value)
//                 event Approval(address indexed owner, address indexed spender, uint256 value)
//             ]"#,
//         );

//         let middleware: Arc<SignerMiddleware<Provider<Http>, Wallet<SigningKey>>> = Arc::new(
//             SignerMiddleware::new_with_provider_chain(client.clone(), wallet.clone())
//                 .await
//                 .unwrap(),
//         );
//         // the switchboard verifying contract
//         let sb_contract =
//             bindings::switchboard::Switchboard::new(contract_address, middleware.clone());

//         let erc20_contract = SBTEST::new(contract_address, middleware);
//         let recipient = "0x56929386E0966a8bb9734a8949AFCF5c9df47743"
//             .parse()
//             .unwrap();
//         let contract_fn_call: ContractCall<EVMMiddleware<_>, _> =
//             erc20_contract.mint(recipient, 100.into());

//         // create a vec of contract calls to pass to the function runner
//         let calls = vec![contract_fn_call.clone()];

//         // First, initialize the runner instance with a freshly generated Gramine keypair
//         let function_runner = EvmFunctionRunner::new().unwrap();

//         let _fr = function_runner.emit(
//             sb_contract,
//             expiration_time_seconds.into(),
//             gas_limit.into(),
//             calls,
//         );
//     }
// }
