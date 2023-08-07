import { SwitchboardProgram } from "../SwitchboardProgram";

import { prepare } from "./prepare";

import type { EvmTransactionFields } from "@switchboard-xyz/common";
import { BN, Evm } from "@switchboard-xyz/common";
import functionSdk from "@switchboard-xyz/evm-functions-bindings";
import type { PopulatedTransaction, Wallet } from "ethers";
import { arrayify } from "ethers/lib/utils";

export class FunctionRunner {
  readonly verifyingContract: string;
  readonly fnKey: string;
  readonly enclaveWallet: Wallet;
  readonly signer: Wallet;
  readonly chainId: number;
  constructor(
    verifyingContract: string,
    enclaveWallet: Wallet,
    signer: Wallet,
    chainId: number
  ) {
    this.verifyingContract = verifyingContract;
    this.enclaveWallet = enclaveWallet;
    this.signer = signer;
    this.chainId = chainId;
    this.fnKey = "";
  }
  async emit(
    populatedTxn: PopulatedTransaction[],
    expirationTimeSeconds: number,
    gasLimit: string
  ) {
    const switchboardcontract = await SwitchboardProgram.load(
      this.signer, // Signer instance
      "0x73d6C66874e570f058834cAA666b2c352F1C792D" // Switchboard contract address
    );

    const preparedTxns = await prepare(
      switchboardcontract.sb,
      this.signer,
      this.enclaveWallet,
      populatedTxn,
      this.signer,
      expirationTimeSeconds,
      gasLimit
    );

    const txs: Array<EvmTransactionFields> = [];
    const signatures: Array<Uint8Array> = [];
    await Promise.all(
      preparedTxns.map(async (tx, i) => {
        txs.push({
          value: tx.transaction.value.toString(),
          gasLimit: tx.transaction.gasLimit.toString(),
          to: arrayify(tx.transaction.to),
          from: arrayify(tx.transaction.from),
          data: arrayify(tx.transaction.data),
          expirationTimeSeconds: new BN(
            tx.transaction.expirationTimeSeconds.toString()
          ),
        });
        signatures.push(arrayify(tx.signature));
      })
    );

    const evmChainResult = new Evm([
      {
        txs,
        signatures,
      },
    ]);

    const serializedResult = JSON.stringify(evmChainResult.value[0]);
    functionSdk.emit(
      1,
      this.enclaveWallet.address,
      Array.from(Buffer.from(this.fnKey, "utf8")),
      Array.from(Buffer.from(this.signer.address, "utf8")),
      serializedResult
    );
  }
}
