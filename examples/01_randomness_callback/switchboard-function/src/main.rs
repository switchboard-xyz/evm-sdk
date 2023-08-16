use ethers::{
  prelude::{abigen, SignerMiddleware, ContractCall},
  providers::{Http, Provider},
  types::{U256},
};
use rand;
use std::sync::Arc;
use std::time::{SystemTime, Duration};
use switchboard_evm::{
  sdk::{EVMFunctionRunner, EVMMiddleware},
};


#[tokio::main(worker_threads = 12)]
async fn main() {

  // define the abi for the functions in the contract you'll be calling
  // -- here it's just a function named "callback", expecting a random u256
  abigen!(
      Receiver,
      r#"[
          function callback(uint256)
      ]"#,
  );

  // Generates a new enclave wallet, pulls in relevant environment variables
  let function_runner = EVMFunctionRunner::new().unwrap();

  // set the gas limit and expiration date
  let gas_limit = 1000000;
  let expiration_time_seconds = 60;
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
  let contract_address = "0x1cEA45f047FEa89887B79ce28723852f288eE09B"
      .parse::<ethers::types::Address>()
      .unwrap();
  let receiver_contract = Receiver::new(contract_address, client);

  // generate a random number U256
  let random: [u64; 4] = rand::random();
  let random = U256(random);

  // call function
  let contract_fn_call: ContractCall<EVMMiddleware<_>, _> =
      receiver_contract.callback(random);

  // create a vec of contract calls to pass to the function runner
  let calls = vec![contract_fn_call.clone()];

  // Emit the result
  function_runner.emit(
      contract_address,
      current_time.try_into().unwrap(),
      gas_limit.into(),
      calls,
  ).unwrap();
}