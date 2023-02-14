<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h1>@switchboard-xyz/evm.js</h1>

  <p>A Typescript client to interact with Switchboard V2 on EVM chains.</p>

  <p>
	  <a href="https://www.npmjs.com/package/@switchboard-xyz/evm.js">
      <img alt="NPM Badge" src="https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-evm?color=red&filename=javascript%2Fevm.js%2Fpackage.json&label=%40switchboard-xyz%2Fevm.js&logo=npm">
    </a>
  </p>

  <p>
    <a href="https://discord.gg/switchboardxyz">
      <img alt="Discord" src="https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/switchboardxyz">
      <img alt="Twitter" src="https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard" />
    </a>
  </p>

  <h4>
    <strong>Npm: </strong><a href="https://www.npmjs.com/package/@switchboard-xyz/evm.js">npmjs.com/package/@switchboard-xyz/evm.js</a>
  </h4>
  <h4>
    <strong>Typedocs: </strong><a href="https://docs.switchboard.xyz/api/@switchboard-xyz/evm.js">docs.switchboard.xyz/api/@switchboard-xyz/evm.js</a>
  </h4>
  <h4>
    <strong>Sbv2 EVM SDK: </strong><a href="https://github.com/switchboard-xyz/sbv2-evm">github.com/switchboard-xyz/sbv2-evm</a>
  </h4>
</div>

## Install

```bash
npm i --save @switchboard-xyz/evm.js
```

## Usage

### Create a Data Feed

```typescript
import { AggregatorAccount, OracleJob } from "@switchboard-xyz/evm.js";
import { BigNumber, Wallet } from "ethers";

const authorityAddress = "0x1"; // Add your address here
const queueAddress = "0x83Fb069B10426056Ef8Ca54750cB9bB552a59e7D"; // Permissionless queue address
const switchboardAddress = "0xe9F5Ecb00BC437F061DF59d899F00f260740dC48";

const batchSize = 1; // 1 oracle will resolve a feed
const minUpdateDelaySeconds = 30; // update every 30 seconds
const minOracleResults = 1; // it should only take 1 oracle to resolve the feed
const ipfsJobsAddress = ""; // OracleJobs stored in IPFS
const varianceThreshold = 0; // Always update - but this is stored as a fixed scale factor decimal 18 digits represent the decimal portion of each num
const minJobResults = 1; // It should only take 1 job to resolve a feed
const forceReportPeriod = 0; // Force a result is off

const tx = await switchboard.createAggregator(
  "My BTC Feed",
  authorityAddress,
  oracleRequestBatchSize,
  minUpdateDelaySeconds,
  minOracleResults,
  ipfsJobsAddress,
  queueAddress,

  /// Response Configs (not used on-chain)
  varianceThreshold,
  minJobResults,
  forceReportPeriod,

  false, // Aggregator V3 Inteface is off (makes updates more expensive)
  {
    value: BigNumber.from(
      new Big(params.initialLoadAmount).mul(WEI_PER_ETH.toString()).toString()
    ),
  }
);

// get aggregator address from receipt
const aggregatorAddress = tx.wait().then((logs) => {
  const log = logs.logs[0];
  const sbLog = switchboard.interface.parseLog(log);
  return sbLog.args.accountAddress as string;
});
```

### Creating Jobs on IPFS

A set of jobs must be encoded with the
[following structure](https://ipfs.io/ipfs/bafybeiaprigfe7hakc4hgqyrjtgsbggrpvzfufpufzvpwtzlznyjb5hjw4/%20USD).
This example uses [web3.storage](https://web3.storage).

```typescript
const jobs = [
  {
    name: job.name,
    weight: job.weight,
    data: Buffer.from(
      sb.OracleJob.encodeDelimited({
        tasks: [
          {
            httpTask: {
              url: "https://api.coinbase.com/v2/prices/USDC-USD/spot",
            },
          },
          {
            jsonParseTask: {
              path: "$.data.amount",
            },
          },
          {
            boundTask: {
              lowerBoundValue: "0.98",
              upperBoundValue: "1.02",
            },
          },
        ],
      }).finish()
    ).toString("base64"),
  },
];

const client = new Web3Storage({
  token: "<TOKEN_GOES_HERE>",
});

// get jobs from validation
const content = new File([JSON.stringify(jobs)], "", {
  type: "application/json",
});

// get content ID - fetchable immediately via ipfs
const cid = await client.put([content], {
  wrapWithDirectory: false,
});
```
