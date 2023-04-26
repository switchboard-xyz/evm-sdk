<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h1>Switchboard V2</h1>

  <p>A collection of libraries and examples for interacting with Switchboard V2 on EVM chains.</p>

  <p>
	  <a href="https://www.npmjs.com/package/@switchboard-xyz/evm.js">
      <img alt="NPM Badge" src="https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-evm?color=red&filename=javascript%2Fevm.js%2Fpackage.json&label=%40switchboard-xyz%2Fevm.js&logo=npm" />
    </a>
  </p>

  <p>
    <a href="https://discord.gg/switchboardxyz">
      <img alt="Discord" src="https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white" />
    </a>
    <a href="https://twitter.com/switchboardxyz">
      <img alt="Twitter" src="https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard" />
    </a>
  </p>

  <h4>
    <strong>Documentation: </strong><a href="https://docs.switchboard.xyz">docs.switchboard.xyz</a>
  </h4>
</div>

## Getting Started

To get started, clone the
[sbv2-evm](https://github.com/switchboard-xyz/sbv2-evm) repository.

```bash
git clone https://github.com/switchboard-xyz/sbv2-evm
```

Then install the dependencies

```bash
cd sbv2-evm
pnpm install
```

## Program IDs

| **Network**     | **Program ID**                               |
| --------------- | -------------------------------------------- |
| CoreDAO Testnet | `0xe9F5Ecb00BC437F061DF59d899F00f260740dC48` |

See [switchboard.xyz/explorer](https://switchboard.xyz/explorer) for a list of
feeds deployed on CoreDAO.

See [app.switchboard.xyz](https://app.switchboard.xyz) to create your own
CoreDAO feeds.

## Libraries

| **Lang** | **Name**                                                                                                                                                                                    | **Description**                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Solidity | [ISwitchboard.sol](/solidity/ISwitchboard/)                                                                                                                                                 | Solidity module to read Switchboard data feeds                                 |
| Solidity | [ILegacyOracle.sol](/solidity/ILegacyOracle/)                                                                                                                                               | Solidity module to read Switchboard data feeds using the legacy oracle adapter |
| JS       | [@switchboard-xyz/evm.js](/javascript/evm.js/) <br />[[npmjs](https://www.npmjs.com/package/@switchboard-xyz/evm.js), [Typedocs](https://docs.switchboard.xyz/api/@switchboard-xyz/evm.js)] | Typescript package to interact with Switchboard V2                             |

## Example Programs

- [read-feed](/contracts/read-feed/): Read a Switchboard feed on Evm chains
- [read-feed-aggregator-v3](/contracts/read-feed-aggregator-v3/): Read a
  Switchboard feed on Evm chains

## Troubleshooting

1. File a [GitHub Issue](https://github.com/switchboard-xyz/sbv2-evm/issues/new)
2. Ask a question in
   [Discord #dev-support](https://discord.com/channels/841525135311634443/984343400377647144)
