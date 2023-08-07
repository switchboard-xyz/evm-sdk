import { EthersError } from "./errors";
import type { SendTransactionMethod } from "./types";

import type {
  Contract,
  ContractFunction,
  ContractTransaction,
  Overrides,
} from "ethers";
import { Signer } from "ethers";

export const sendTxnWithOptions: SendTransactionMethod = async (
  _contract,
  methodName,
  args,
  options
): Promise<ContractTransaction> => {
  try {
    // update the signer
    let contract: Contract = _contract;
    if (options && "signer" in options && Signer.isSigner(options.signer)) {
      const signer: Signer = options.signer;
      contract = _contract.connect(signer);
    }

    const method: ContractFunction<ContractTransaction> =
      contract.functions[methodName as string];

    if (!((method as any) instanceof Function)) {
      throw new Error(
        `The method ${
          methodName as string
        } does not exist on the provided contract.`
      );
    }

    const overrides: Partial<Overrides> = { ...options };
    overrides["gasFactor"] = undefined;
    overrides["simulate"] = undefined;
    overrides["signer"] = undefined;

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

    // call simulate after populating all overrides
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
  } catch (error) {
    EthersError.handleError(error);
  }
};
