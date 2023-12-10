/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CallBalance,
  CallBalanceInterface,
} from "../../../src/callVerify/CallBalance";

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "callIds",
        type: "address[]",
      },
    ],
    name: "callBalances",
    outputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610481806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80630aaeffe514610030575b600080fd5b61004361003e366004610305565b610059565b60405161005091906103ca565b60405180910390f35b6060815167ffffffffffffffff811115610075576100756102d3565b60405190808252806020026020018201604052801561009e578160200160208202803683370190505b50905060005b82518110156102cd576101098382815181106100c2576100c261040e565b60200260200101516001600160a01b0390811660009081527fe08a3b4c6c3d2fd532698fd427d3f5b0497ef9035291d02cdb919e9e7e8df5ff602052604090205416151590565b1561018b576101648382815181106101235761012361040e565b60200260200101516001600160a01b031660009081527fe08a3b4c6c3d2fd532698fd427d3f5b0497ef9035291d02cdb919e9e7e8df5ff6020526040902090565b6006015482828151811061017a5761017a61040e565b6020026020010181815250506102bb565b6101e78382815181106101a0576101a061040e565b60200260200101516001600160a01b0390811660009081527f275994c3f98b40ffc33e238dface8705a449977b49eb0a027dcfa35e2a5a7bb2602052604090205416151590565b6102425760405162461bcd60e51b815260206004820152602260248201527f43616c6c42616c616e63653a2063616c6c496420646f6573206e6f74206578696044820152611cdd60f21b606482015260840160405180910390fd5b6102988382815181106102575761025761040e565b60200260200101516001600160a01b031660009081527f275994c3f98b40ffc33e238dface8705a449977b49eb0a027dcfa35e2a5a7bb26020526040902090565b600601548282815181106102ae576102ae61040e565b6020026020010181815250505b806102c581610424565b9150506100a4565b50919050565b634e487b7160e01b600052604160045260246000fd5b80356001600160a01b038116811461030057600080fd5b919050565b6000602080838503121561031857600080fd5b823567ffffffffffffffff8082111561033057600080fd5b818501915085601f83011261034457600080fd5b813581811115610356576103566102d3565b8060051b604051601f19603f8301168101818110858211171561037b5761037b6102d3565b60405291825284820192508381018501918883111561039957600080fd5b938501935b828510156103be576103af856102e9565b8452938501939285019261039e565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b81811015610402578351835292840192918401916001016103e6565b50909695505050505050565b634e487b7160e01b600052603260045260246000fd5b60006001820161044457634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212201c31c667d6e38c9ffb7cde3e3d4ac430af423426756b4f0989e85e75ac3fea2564736f6c63430008110033";

type CallBalanceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CallBalanceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CallBalance__factory extends ContractFactory {
  constructor(...args: CallBalanceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CallBalance> {
    return super.deploy(overrides || {}) as Promise<CallBalance>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CallBalance {
    return super.attach(address) as CallBalance;
  }
  override connect(signer: Signer): CallBalance__factory {
    return super.connect(signer) as CallBalance__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CallBalanceInterface {
    return new utils.Interface(_abi) as CallBalanceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CallBalance {
    return new Contract(address, _abi, signerOrProvider) as CallBalance;
  }
}
