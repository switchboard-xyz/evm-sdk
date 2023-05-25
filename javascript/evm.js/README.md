<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.png)

# @switchboard-xyz/evm.js

> A Typescript client to interact with Switchboard on NEAR.

[![NPM Badge](https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-evm?color=red&filename=javascript%2Fevm.js%2Fpackage.json&label=%40switchboard-xyz%2Fevm.js&logo=npm)](https://www.npmjs.com/package/@switchboard-xyz/evm.js)

</div>

## Install

```bash
npm i --save @switchboard-xyz/evm.js
```

## Usage

**Directory**

- [Create a Queue](#create-a-queue)
- [Add an Oracle](#add-an-oracle)
- [Create a Data Feed](#create-a-data-feed)
- [Read a Data Feed](#read-a-data-feed)
- [Watch Data Feed](#watch-data-feed)
- [Create a Job on IPFS](#create-a-job-on-ipfs)

### Create a Queue

```ts
import { OracleQueueAccount } from "@switchboard-xyz/evm.js";

const oracleQueueAccount = new OracleQueueAccount(
  switchboardProgram,
  queueAddress
);

const aggregatorAccount = await oracleQueueAccount.createAggregator(
  {
    authority: "0xYourAuthority",
    name: "MyAggregator",
    queueAddress: "0xQueueAddress",
    batchSize: 10,
    minOracleResults: 5,
    minJobResults: 3,
    minUpdateDelaySeconds: 60,
    varianceThreshold: 0.05,
    forceReportPeriod: 600,
    jobsHash: "0xJobHash",
    enableLegacyAdapter: false,
    initialValue: 0,
  },
  // enable the oracle queue usage permissions (requires msg.sender to be queueAuthority)
  true,
  // you can also explicitly provide the queueAuthority signer
  {
    signer: queueAuthoritySigner,
  }
);
const aggregator = await aggregatorAccount.loadData();
```

### Add an Oracle

```ts
import { OracleQueueAccount } from "@switchboard-xyz/evm.js";

const oracleQueueAccount = new OracleQueueAccount(
  switchboardProgram,
  queueAddress
);

const oracleAccount = await oracleQueueAccount.createOracle(
  {
    name: "my oracle",
    authority: "0xMyOracleAuthority",
  },
  // enable the heartbeat permissions (requires msg.sender to be queueAuthority)
  true,
  // you can also explicitly provide the queueAuthority signer
  {
    signer: queueAuthoritySigner,
  }
);
const oracle = await oracleAccount.loadData();

await oracleAccount.heartbeat();
```

### Create a Data Feed

```ts
import { QueueAccount } from "@switchboard-xyz/solana.js";
import { OracleJob } from "@switchboard-xyz/common";

const queueAccount = new QueueAccount(program, queuePubkey);

const [aggregatorAccount, aggregatorInitSignatures] =
  await queueAccount.createFeed({
    batchSize: 1,
    minRequiredOracleResults: 1,
    minRequiredJobResults: 1,
    minUpdateDelaySeconds: 60,
    fundAmount: 2.5, // deposit 2.5 wSOL into the leaseAccount escrow
    jobs: [
      { pubkey: jobAccount.publicKey },
      {
        weight: 2,
        data: OracleJob.encodeDelimited(
          OracleJob.fromObject({
            tasks: [
              {
                valueTask: {
                  value: 1,
                },
              },
            ],
          })
        ).finish(),
      },
    ],
  });
const aggregator = await aggregatorAccount.loadData();
```

### Read a Data Feed

After the oracles respond, read the feed result

```ts
import { AggregatorAccount } from "@switchboard-xyz/evm.js";

const aggregatorAccount = new AggregatorAccount(
  switchboardProgram,
  aggregatorAddress
);
const result: number = await aggregatorAccount.latestValue();
console.log(result);
```

### Watch Data Feed

Setup a websocket listener to invoke a callback whenever an aggregator is updated

```ts
import { AggregatorAccount } from "@switchboard-xyz/evm.js";

const watchHandle = AggregatorAccount.watch(
  switchboardProgram,
  "0xAggregatorAccountAddress",
  (event) => {
    console.log(event);
  }
);

// To stop watching
watchHandle.stop();
```

### Create a Job on IPFS

A set of jobs must be encoded with the [following structure](https://ipfs.io/ipfs/bafybeiaprigfe7hakc4hgqyrjtgsbggrpvzfufpufzvpwtzlznyjb5hjw4/%20USD). This example uses [web3.storage](https://web3.storage).

```ts
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
