import ethers from "ethers";
import { SwitchboardProgram } from "@switchboard-xyz/evm.js";

// Instantiate SwitchboardProgram
const signer = new ethers.Wallet(privateKey);
const switchboardProgram = await SwitchboardProgram.load(
  signer, // Signer instance
  "0x73d6C66874e570f058834cAA666b2c352F1C792D" // Switchboard contract address
);

// Send a transaction to Switchboard
const tx = await switchboard.sendSbTxn("createOracleQueue", [
     name,
     authority,
     unpermissionedFeedsEnabled,
     maxSize,
     reward,
     oracleTimeout,
   ]
);

// Fetch all aggregator data for a given authority
const authority = '0xabc123...'; // the public key of the authority
const aggregatorData = await switchboardProgram.fetchAggregators(authority);

// Connect a new signer to SwitchboardProgram
const newSigner = new ethers.Wallet(newPrivateKey);
const newSwitchboardProgram = switchboardProgram.connect(newSigner);