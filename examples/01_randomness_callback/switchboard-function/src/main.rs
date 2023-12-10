use ethers::{prelude::{abigen, SignerMiddleware}, types::*};
use ethers::abi::AbiDecode;
use ethers::contract::{EthAbiType, EthAbiCodec};
use switchboard_evm::sdk::{EVMFunctionRunner};
use switchboard_evm::{Gramine, SbMiddleware, FnCall};
use sb_macros::{sb_function, sb_error};

abigen!(Receiver, r#"[function callback(uint256)]"#);

static CLIENT_URL: &str = "https://goerli-rollup.arbitrum.io/rpc";

#[derive(EthAbiType, EthAbiCodec, Default, Debug, Clone)]
pub struct Params {
    callback: Address,
}

#[sb_function(expiration_seconds = 120, gas_limit = 5_500_000)]
async fn sb_function(client: SbMiddleware, _call_id: Address, params: Params) -> SbResult {
    let receiver_contract = Receiver::new(params.callback, client.into());
    let mut random = [0u8; 32];
    Gramine::read_rand(random.as_mut_slice()).map_err(|_| SbError::SgxRandReadFail)?;
    Ok(vec![receiver_contract.callback(U256::from_little_endian(&random))])
}

#[sb_error]
pub enum SbError {
    SgxRandReadFail
}
