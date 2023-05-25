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
