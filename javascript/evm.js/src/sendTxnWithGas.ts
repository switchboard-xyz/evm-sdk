import { SendTransactionMethod } from "./types";

export const sendTxnWithOptions: SendTransactionMethod = async (
  contract,
  methodName,
  args,
  options
) => {
  const method = contract[methodName];
  const estimateGasMethod = contract["estimateGas"][methodName as string];

  if (
    !((method as any) instanceof Function) ||
    !(estimateGasMethod instanceof Function)
  ) {
    throw new Error(
      `The method ${
        methodName as string
      } does not exist on the provided contract.`
    );
  }

  const gasEstimate = await estimateGasMethod(...(args as unknown[]));
  const gasLimit = Math.floor(
    gasEstimate.toNumber() * (options?.gasFactor ?? 1)
  );

  const overrides = {
    gasLimit: gasLimit,
  };

  const result = await method(...args, overrides);

  return result;
};
