import { SendTransactionMethod } from "./types";

import { TransactionResponse } from "@ethersproject/providers";
import {
  ContractFunction,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";
import { stdout } from "process";

export const sendTxnWithOptions: SendTransactionMethod = async (
  _contract,
  methodName,
  args,
  options
): Promise<ContractTransaction> => {
  // update the signer
  const contract =
    options && "signer" in options && Signer.isSigner(options.signer)
      ? _contract.connect(options.signer)
      : _contract;

  const method: ContractFunction<ContractTransaction> =
    contract.functions[methodName as string];

  if (!((method as any) instanceof Function)) {
    throw new Error(
      `The method ${
        methodName as string
      } does not exist on the provided contract.`
    );
  }

  const overrides: Partial<Overrides> = {};

  if ((options?.gasFactor ?? 0) > 1) {
    const estimateGasMethod = contract.estimateGas[methodName as string];
    if (!(estimateGasMethod instanceof Function)) {
      throw new Error(
        `The estimateGas method ${
          methodName as string
        } does not exist on the provided contract.`
      );
    }

    const gasEstimate = await estimateGasMethod(...(args as unknown[]));
    const gasLimit = Math.floor(
      gasEstimate.toNumber() * (options?.gasFactor ?? 1)
    );
    overrides["gasLimit"] = gasLimit;
  }

  if (options && options?.simulate) {
    const simulateMethod = contract["callStatic"][methodName as string];
    if (!(simulateMethod instanceof Function)) {
      throw new Error(
        `The callStatic method ${
          methodName as string
        } does not exist on the provided contract.`
      );
    }

    await simulateMethod(...(args as unknown[]), overrides);
  }

  const result = await method(...(args as unknown[]), overrides);

  return result;
};
