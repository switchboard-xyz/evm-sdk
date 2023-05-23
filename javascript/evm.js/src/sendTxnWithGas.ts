import { BigNumber, Contract, ContractFunction } from "ethers";

export type EstimateGasFunctions = Record<string, ContractFunction<BigNumber>>;

export async function sendTxnWithGas<
  T extends Contract,
  K extends keyof T & keyof EstimateGasFunctions
>(
  contract: T,
  gasFactor: number,
  methodName: K,
  ...args: Parameters<T[K]>
): Promise<ReturnType<T[K]>> {
  const method = contract[methodName];
  const estimateGasMethod =
    contract.estimateGas[methodName as keyof EstimateGasFunctions];

  if (
    !((method as any) instanceof Function) ||
    !(estimateGasMethod instanceof Function)
  ) {
    throw new Error(
      `The method ${methodName} does not exist on the provided contract.`
    );
  }

  const gasEstimate = await estimateGasMethod(...(args as unknown[]));
  const gasLimit = Math.floor(gasEstimate.toNumber() * (gasFactor ?? 1));

  const overrides = {
    gasLimit: gasLimit,
  };

  const result = await method(...args, overrides);

  return result;
}
