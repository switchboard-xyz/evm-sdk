use ethers::{
  prelude::{abigen, SignerMiddleware, ContractCall, EthAbiType, EthAbiCodec},
  providers::{Http, Provider},
  types::{U256, Address},
};
use rand;
use std::sync::Arc;
use std::time::{SystemTime, Duration};
use switchboard_evm::{
  sdk::{EVMFunctionRunner, EVMMiddleware},
};
use std::env;


#[tokio::main(worker_threads = 12)]
async fn main() {

  // define the abi for the functions in the contract you'll be calling
  // -- here it's just a function named "callback", expecting a random u256
  abigen!(
      Receiver,
      r#"[
          function fillOrder(uint256,uint256)
      ]"#,
  );

  #[derive(Debug, Clone, EthAbiType, EthAbiCodec)]
  struct OrderParams {
      orderId: U256,
      sender: Address,
  }

  // Generates a new enclave wallet, pulls in relevant environment variables
  let function_runner = EVMFunctionRunner::new().unwrap();

  // set the gas limit and expiration date
  let gas_limit = 1_000_000;
  let current_time = SystemTime::now()
          .duration_since(SystemTime::UNIX_EPOCH)
          .unwrap_or(Duration::ZERO)
          .as_secs() + 64;


  // create a client, wallet and middleware. This is just so we can create the contract instance and sign the txn.
  // @TODO: update the provider to whichever network you're using
  let provider = Provider::<Http>::try_from("https://rpc.test.btcs.network").unwrap();
  let client = Arc::new(
      SignerMiddleware::new_with_provider_chain(provider.clone(), function_runner.enclave_wallet.clone())
          .await
          .unwrap(),
  );

  // @TODO: your target contract address here
  let contract_address = "0x8610Eac76946A5c724f840a790f39777a4aa0770"
      .parse::<ethers::types::Address>()
      .unwrap();
  let receiver_contract = Receiver::new(contract_address, client);

  // Get individual call parameters
  let params = function_runner.params::<OrderParams>();


  // log envvars
  let call_ids = env::var("FUNCTION_CALL_IDS").unwrap_or(String::new());

  // print call_ids
  println!("Received call ids: {}", call_ids);
  
  let call_ids: Vec<Vec<u8>> = serde_json::from_str(&call_ids).unwrap_or(vec![]);

  // Handle each function call that has happened since the last run
  let calls: Vec<ContractCall<EVMMiddleware<_>, _>> = params.iter().map(|param| {
      let order_id = param.orderId;
      let sender = param.sender;

      println!("Received order {} from {}", order_id, sender);

      // generate a random number U256
      let random: [u64; 4] = rand::random();
      let random = U256(random);

      // Create a contract call for each param 
      let contract_fn_call: ContractCall<EVMMiddleware<_>, _> =
          receiver_contract.fill_order(order_id, random);
      contract_fn_call
  }).collect::<Vec<_>>();

  // Emit the result
  function_runner.emit(
      contract_address,
      current_time.try_into().unwrap(),
      gas_limit.into(),
      calls,
  ).unwrap();
}