# EVM Switchboard SDK

[![GitHub](https://img.shields.io/badge/--181717?logo=github&logoColor=ffffff)](https://github.com/switchboard-xyz/aptos-sdk)&nbsp;
[![twitter](https://badgen.net/twitter/follow/switchboardxyz)](https://twitter.com/switchboardxyz)&nbsp;&nbsp;

A library of utility functions to interact with the SwitchboardV2 evm implementation

**Official Documentation**:
[https://docs.switchboard.xyz/](https://docs.switchboard.xyz/)

### CoreDAO Testnet Contract Address

```
0xe9F5Ecb00BC437F061DF59d899F00f260740dC48
```

## Integrating Switchboard

### Example Usage

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISwitchboard {

  // read from aggregator
  function latestResult(address aggregatorAddress)
    external
    payable
    returns (
      int256 value,
      uint timestamp
    );

  // read round from an aggregator
  function latestRound(address aggregatorAddress)
    external
    payable
    returns (
      uint80 round,
      int256 value,
      uint256 timestamp,
      uint256 oldestConsideredValueTimestamp
    );
}

contract ReadAFeed {

  // version of this contract
  int256 public latestValue;
  uint256 public latestTimestamp;
  address switchboardAddress;
  address aggregatorAddress;

  // constructor
  // switchboard coreadao address: 0xe9F5Ecb00BC437F061DF59d899F00f260740dC48
  // example feed address:
  constructor(address _switchboard, address _aggregatorAddress) {
    switchboardAddress = _switchboard;
    aggregatorAddress = _aggregatorAddress;
  }

  function latest() external view returns (int256, uint256) {
    return (latestValue, latestTimestamp);
  }

  function getLatestResult()
    external
    returns (
      int256 value,
      uint256 timestamp
    ) {

      ISwitchboard switchboard = ISwitchboard(switchboardAddress);
      (value, timestamp) = switchboard.latestResult(aggregatorAddress);
      latestValue = value;
      latestTimestamp = timestamp;
    }
}
```

## Creating Feeds via SDK

## Install

```
npm i --save @switchboard-xyz/evm.js
```

## Typescript Aggregator Creation

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

A set of jobs must be encoded with the [following structure](https://ipfs.io/ipfs/bafybeiaprigfe7hakc4hgqyrjtgsbggrpvzfufpufzvpwtzlznyjb5hjw4/%20USD). This example uses [web3.storage](https://web3.storage).

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
