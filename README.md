<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.png)

# Switchboard x EVM

> A collection of libraries and examples for interacting with Switchboard on EVM
> chains.

[![NPM Badge](https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-evm?color=red&filename=javascript%2Fevm.js%2Fpackage.json&label=%40switchboard-xyz%2Fevm.js&logo=npm)](https://www.npmjs.com/package/@switchboard-xyz/evm.js)

</div>

## Getting Started

To get started, clone the
[evm-sdk](https://github.com/switchboard-xyz/evm-sdk) repository.

```bash
git clone https://github.com/switchboard-xyz/evm-sdk
```

Then install the dependencies

```bash
cd evm-sdk
pnpm install
pnpm build
```

## Switchboard Functions

Switchboard V3 revolves around the concept of a `Switchboard Function`. Functions are the core building block of Switchboard. They are the unit of work that is performed by the Switchboard network. Functions can be user defined, and can be composed together to create more complex functions. Function calls can be initialized on-chain, or on a schedule.

Get started writing Switchboard Functions with our [functions template repository](https://github.com/switchboard-xyz/evm-functions-template).

## Switchboard Feeds

Switchboard Data Feeds are powered by Switchboard Functions. You can find the source code (contracts and off-chain logic) for the Switchboard Function that powers the available feeds in the [functions repository](https://github.com/switchboard-xyz/evm-functions-template/tree/main/rust/01_price_oracle/SwitchboardPushReceiver).
- [Receiver.sol](https://github.com/switchboard-xyz/evm-functions-template/blob/main/rust/01_price_oracle/SwitchboardPushReceiver/contracts/src/SwitchboardPushReceiver/Receiver/Receiver.sol)) - The main entry point for the Switchboard Feed Function. This contract is deployed by the Switchboard, and is responsible for receiving data from the off-chain Switchboard Function, and making it available to other contracts.
- [Main.rs](https://github.com/switchboard-xyz/evm-functions-template/blob/main/rust/01_price_oracle/SwitchboardPushReceiver/switchboard-function/src/main.rs) - The off-chain Switchboard Function that powers the Switchboard Feed. This function is responsible for fetching data from an external API, and submitting it to the Switchboard Receiver contract.


You can find existing Switchboard Feeds and their ID's for accessing in solidity at [app.switchboard.xyz](https://app.switchboard.xyz/).

You can use this simple price function (which supplies 500+ feeds from top exchanges!) and build custom functionality on top of it

<!--
## Addresses

### Arbitrum

The following addresses can be used with the Switchboard deployment on Arbitrum

#### Mainnet

| Account              | Address                                      |
| -------------------- | -------------------------------------------- |
| Program ID           | `0xd54579539E1334E856b983745DA26BEc3efB3C4D` |
| Attestation Service  | `0x316fBe540C719970E6427ccD8590d7E0a2814C5D` |
| Permissionless Queue | `0x127f24013CaADF770F4b514c86344dD4f38d80c2` |

#### Testnet (Goerli)

| Account              | Address                                      |
| -------------------- | -------------------------------------------- |
| Program ID           | `0x2802f459D1515257b73fAaa6dD9512E7cDE04592` |
| Attestation Service  | `0xFC8e90254194B038F2e233129202f096a8507e80` |
| Permissionless Queue | `0x3E1A13b2d6E0665A32d8638eA216A16953E8a9aF` |

### CoreDAO

The following addresses can be used with the Switchboard deployment on Coredao

#### Mainnet

| Account              | Address                                      |
| -------------------- | -------------------------------------------- |
| Program ID           | `0x73d6C66874e570f058834cAA666b2c352F1C792D` |
| Permissioned Queue   | `0x1e373Ac0a299E6CCfE6bd333025E5Ebef9Eca2Dd` |
| Permissionless Queue | `0x628D9A4109FD1B94348b7866923A4b7aae3D61c6` |

#### Testnet

| Account              | Address                                      |
| -------------------- | -------------------------------------------- |
| Program ID           | `0x1bAB46734e02d25D9dF5EE725c0646b39C0c5224` |
| Program Authority    | `0xB76E3A368dA2B6E6E5F5F686046C7cb0a3e1Bd1A` |
| Permissionless Queue | `0x934eb1F9D0f59695050f761DC64e443E5030A569` | -->

## Clients

| **Lang**   | **Name**                                     | **Description**                                                                   |
| ---------- | -------------------------------------------- | --------------------------------------------------------------------------------- |
| Solidity   | [ISwitchboard](solidity/ISwitchboard)        | A Solidity contract to read a Switchboard data feed.                              |
| Solidity   | [ILegacyOracle](solidity/ILegacyOracle)      | A Solidity contract to read a Switchboard data feed with a legacy oracle adapter. |
| Javascript | [@switchboard-xyz/evm.js](javascript/evm.js) | A Typescript client to interact with Switchboard on EVM chains.                   |

## Example Contracts

| **Lang** | **Name**                                                       | **Description**                                                                              |
| -------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Solidity | [randomness-calllback](examples/01_randomness_callback)        | An example Solidity contract demonstrating how to consume randomenss with Switchboard.       |
| Solidity | [user-triggered-callback](examples/02_user_triggered_callback) | An example Solidity contract demonstrating how manually trigger a callback with Switchboard. |

## Troubleshooting

1. File a [GitHub Issue](https://github.com/switchboard-xyz/evm-sdk/issues/new)
2. Ask a question in
   [Discord #dev-support](https://discord.com/channels/841525135311634443/984343400377647144)
