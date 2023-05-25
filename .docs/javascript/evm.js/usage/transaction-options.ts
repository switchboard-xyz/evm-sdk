// Most methods have an optional TransactionOptions parameter to provide overrides and an optional new signer
const txOptions: TransactionOptions = {
  // an optional multiplier to modify the gasEstimation
  gasFactor: 1.1,
  // simulate the tx before sending
  simulate: true,
  // the new msg.sender for the tx
  signer: myNewSigner,
  // it also supports any fields from ethers PayableOverrides
  gasLimit: 3000000,
  gasPrice: 10000,
  maxFeePerGas: 10000,
  maxPriorityFeePerGas: 1000,
  nonce: 1337,
};

// Send a transaction to the Switchboard.sol contract
const tx = await switchboardProgram.sendSbTxn(
  "methodName",
  [...args],
  // optional txnOptions
  txOptions
);

// Send a transaction to the SwitchboardAttestationService.sol contract
const tx = await switchboardProgram.sendVsTxn(
  "methodName",
  [...args],
  // optional txnOptions
  txOptions
);
