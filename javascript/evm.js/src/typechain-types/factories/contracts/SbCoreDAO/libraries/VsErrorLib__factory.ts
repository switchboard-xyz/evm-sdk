/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  VsErrorLib,
  VsErrorLibInterface,
} from "../../../../contracts/SbCoreDAO/libraries/VsErrorLib";

const _abi = [
  {
    inputs: [],
    name: "AttestationQueueAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "AttestationQueueDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "FunctionDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientNodes",
    type: "error",
  },
  {
    inputs: [],
    name: "QuoteAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "QuoteDoesNotExist",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220da198aa54de0b2ae92945b973f25ef560cb68bf398d3c78e0a99909496db0b6c64736f6c63430008110033";

type VsErrorLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VsErrorLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VsErrorLib__factory extends ContractFactory {
  constructor(...args: VsErrorLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VsErrorLib> {
    return super.deploy(overrides || {}) as Promise<VsErrorLib>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VsErrorLib {
    return super.attach(address) as VsErrorLib;
  }
  override connect(signer: Signer): VsErrorLib__factory {
    return super.connect(signer) as VsErrorLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VsErrorLibInterface {
    return new utils.Interface(_abi) as VsErrorLibInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VsErrorLib {
    return new Contract(address, _abi, signerOrProvider) as VsErrorLib;
  }
}
