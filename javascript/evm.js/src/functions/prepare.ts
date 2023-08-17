import type { TransactionStruct } from "../types.js";

import type { PopulatedTransaction, TypedDataDomain, Wallet } from "ethers";
import { BigNumber } from "ethers";
import { _TypedDataEncoder, joinSignature } from "ethers/lib/utils";
export async function prepare(
  contract: string,
  payerWallet: Wallet,
  enclaveWallet: Wallet,
  txs: PopulatedTransaction[],
  chainId: number,
  from?: Wallet,
  expirationTimeSeconds?: number, // defaults to now + 30s
  gasLimit?: string
): Promise<
  {
    transaction: TransactionStruct;
    signature: string;
  }[]
> {
  // Typed Data Domain for signing
  const typedDataDomain: TypedDataDomain = {
    name: "Switchboard",
    version: "0.0.1",
    chainId,
    verifyingContract: contract,
  };

  const transactions: {
    transaction: TransactionStruct;
    signature: string;
  }[] = txs.map((tx) => {
    const transaction: TransactionStruct = {
      data: tx.data,
      from: from ? from.address : tx.from,
      to: tx.to,
      value: tx.value ?? BigNumber.from(0),
      gasLimit: tx.gasLimit ?? gasLimit ?? 1_000_000,
      expirationTimeSeconds: BigNumber.from(
        expirationTimeSeconds
          ? expirationTimeSeconds
          : Math.floor(Date.now() / 1000 + 60)
      ),
    };
    const signer =
      transaction.from === enclaveWallet.address ? enclaveWallet : payerWallet;
    const signature = joinSignature(
      signer._signingKey().signDigest(
        _TypedDataEncoder.hash(
          typedDataDomain,
          {
            Transaction: [
              { name: "expirationTimeSeconds", type: "uint256" },
              { name: "gasLimit", type: "uint256" },
              { name: "value", type: "uint256" },
              { name: "to", type: "address" },
              { name: "from", type: "address" },
              { name: "data", type: "bytes" },
            ],
          },
          transaction
        )
      )
    );
    return {
      transaction,
      signature,
    };
  });

  return transactions;
}
