import { SendTransactionMethod } from "./types";

import { Overrides } from "ethers";
import { stdout } from "process";

export const sendTxnWithOptions: SendTransactionMethod = async (
  contract,
  methodName,
  args,
  options
) => {
  const method = contract[methodName];
  if (!((method as any) instanceof Function)) {
    throw new Error(
      `The method ${
        methodName as string
      } does not exist on the provided contract.`
    );
  }

  const overrides: Partial<Overrides> = {};

  if (options?.gasFactor) {
    const estimateGasMethod = contract["estimateGas"][methodName as string];
    if (!(estimateGasMethod instanceof Function)) {
      throw new Error(
        `The estimateGas method ${
          methodName as string
        } does not exist on the provided contract.`
      );
    }

    const gasEstimate = await estimateGasMethod(...args);
    const gasLimit = Math.floor(
      gasEstimate.toNumber() * (options?.gasFactor ?? 1)
    );
    overrides["gasLimit"] = gasLimit;
  }

  if (options?.simulate) {
    const simulateMethod = contract["callStatic"][methodName as string];
    await simulateMethod(...args, overrides);
  }

  const result = await method(...args, overrides);

  return result;
};
