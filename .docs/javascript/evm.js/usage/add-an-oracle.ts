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
