import { AggregatorAccount } from "@switchboard-xyz/evm.js";

const aggregatorAccount = new AggregatorAccount(
  switchboardProgram,
  aggregatorAddress
);
const result: number = await aggregatorAccount.latestValue();
console.log(result);
