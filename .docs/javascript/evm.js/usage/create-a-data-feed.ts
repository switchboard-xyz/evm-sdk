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
