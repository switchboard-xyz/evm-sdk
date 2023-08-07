pub mod bindings;
// pub mod function;
pub mod sdk;

pub mod utils;
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

//     use crate::sdk::{EVMFunctionRunner, EVMMiddleware};

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
//         let function_runner = EVMFunctionRunner::new().unwrap();

//         let _fr = function_runner.emit(
//             sb_contract,
//             expiration_time_seconds.into(),
//             gas_limit.into(),
//             calls,
//         );
//     }
// }
