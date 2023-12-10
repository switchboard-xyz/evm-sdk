<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/core-sdk/raw/main/website/static/img/icons/switchboard/avatar.png)

# switchboard-evm

> A Rust library to interact with Switchboard on EVM based chains.

[![Crates.io Badge](https://img.shields.io/crates/v/switchboard-evm?label=switchboard-evm&logo=rust)](https://crates.io/crates/switchboard-evm)

[![Discord Badge](https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white)](https://discord.gg/switchboardxyz)

[![Twitter Badge](https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard)](https://twitter.com/switchboardxyz)

  <h4>
    <strong>Typedocs: </strong><a href="https://docs.rs/switchboard-evm">docs.rs/switchboard-evm</a>
  </h4>
  <h4>
    <strong>EVM SDK: </strong><a href="https://github.com/switchboard-xyz/evm-sdk">github.com/switchboard-xyz/evm-sdk</a>
  </h4>
  <h4>
    <strong>Switchboard Documentation: </strong><a href="https://docs.switchboard.xyz">docs.switchboard.xyz</a>
  </h4>
</div>

## Install

Run the following Cargo command in your project directory:

```bash
cargo add switchboard-evm
```

Or add the following line to your Cargo.toml:

```toml
[dependencies]
switchboard-evm = "0.5.15"
```

## Usage

Here's an example of using the EvmFunctionRunner inside a Switchboard Function:

```rust
/// Required
static CLIENT_URL: &str = "https://goerli-rollup.arbitrum.io/rpc";
// Generate your contract's ABI
abigen!(Receiver, r#"[ function callback(uint256) ]"#,);

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
```
