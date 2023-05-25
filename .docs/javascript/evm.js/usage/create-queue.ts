import { OracleQueueAccount } from "@switchboard-xyz/evm.js";

const [oracleQueueAccount, tx] = await OracleQueueAccount.create(
  switchboardProgram,
  {
    authority: "0xMyAuthority",
    name: "my queue",
    oracleTimeout: 3600,
    reward: 10000000,
    unpermissionedFeedsEnabled: true,
    maxSize: 100,
  }
);
const oracleQueue = await oracleQueueAccount.loadData();