import type { Switchboard, TransactionStruct } from "..";

import { BigNumber } from "@ethersproject/bignumber";
import type { PopulatedTransaction, TypedDataDomain, Wallet } from "ethers";
import { _TypedDataEncoder, joinSignature } from "ethers/lib/utils";
export async function prepare(
  contract: Switchboard,
  payerWallet: Wallet,
  enclaveWallet: Wallet,
  txs: PopulatedTransaction[],
  from?: Wallet,
  expirationTimeSeconds?: number, // defaults to now + 30s
  gasLimit?: string
): Promise<
  {
    transaction: TransactionStruct;
    signature: string;
  }[]
> {
  // defaults to balance){
  const typedDataDomain: TypedDataDomain = {
    name: "Switchboard",
    version: "0.0.1",
    chainId: await contract.signer.getChainId(),
    verifyingContract: contract.address,
  };

  const balance = await (from
    ? from.getBalance()
    : contract.signer.getBalance());

  const transactions: {
    transaction: TransactionStruct;
    signature: string;
  }[] = await Promise.all(
    txs.map(async (tx) => {
      const transaction: TransactionStruct = {
        data: tx.data!,
        from: from ? from.address : tx.from!,
        to: tx.to!,
        value: tx.value ?? BigNumber.from(0),
        gasLimit: tx.gasLimit ?? balance,
        expirationTimeSeconds: BigNumber.from(
          expirationTimeSeconds
            ? expirationTimeSeconds
            : Math.floor(Date.now() / 1000 + 30)
        ),
      };
      const signer =
        transaction.from === enclaveWallet.address
          ? enclaveWallet
          : payerWallet;
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
    })
  );

  return transactions;
}
