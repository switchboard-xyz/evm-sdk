use ethers::abi::AbiDecode;
use ethers::{
    prelude::{abigen, EthAbiCodec, EthAbiType, SignerMiddleware},
    providers::{Http, Provider},
    types::{Address, U256},
};
use rand;

use ethers::prelude::*;
use switchboard_evm::sb_error;
use switchboard_evm::sb_function;
use switchboard_evm::sdk::EVMFunctionRunner;
use switchboard_evm::FnCall;
use switchboard_evm::SbFunctionParameters;

/// REQUIRED
static CLIENT_URL: &str = "https://goerli-rollup.arbitrum.io/rpc";
static RECEIVER: &str = env!("CALLBACK_ADDRESS");

// define the abi for the functions in the contract you'll be calling
// -- here it's just a function named "callback", expecting a random u256
abigen!(Receiver, r#"[function fillOrder(uint256,uint256)]"#);

#[derive(Default, Debug, Clone, EthAbiType, EthAbiCodec)]
struct OrderParams {
    orderId: U256,
    sender: Address,
}
impl SbFunctionParameters for OrderParams {
    fn parse(data: &[u8]) -> Self {
        OrderParams::decode(data).unwrap_or_default()
    }
}

#[sb_function(expiration_seconds = 120, gas_limit = 5_500_000)]
async fn sb_function<M: Middleware, S: Signer>(
    client: SignerMiddleware<M, S>,
    params: OrderParams,
) -> Result<Vec<FnCall<M, S>>, Error> {
    let contract_address: Address = RECEIVER.parse().map_err(|_| Error::ParseError)?;
    let receiver_contract = Receiver::new(contract_address, client.into());

    let order_id = params.orderId;
    let sender = params.sender;

    println!("Received order {} from {}", order_id, sender);

    // generate a random number U256
    let random: [u64; 4] = rand::random();
    let random = U256(random);

    // Create a contract call for each param
    let contract_fn_call = receiver_contract.fill_order(order_id, random);
    Ok(vec![contract_fn_call])
}

#[sb_error]
enum Error {
    ParseError = 1,
}

