/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ReceiverExample,
  ReceiverExampleInterface,
} from "../../../../contracts/src/ReceiverExample/ReceiverExample";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_switchboard",
        type: "address",
      },
      {
        internalType: "address",
        name: "_functionId",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "NewRandomValue",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "callback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "randomValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161026c38038061026c83398101604081905261002f91610073565b6001600160a01b03918216608052600180546001600160a01b031916919092161790556100a6565b80516001600160a01b038116811461006e57600080fd5b919050565b6000806040838503121561008657600080fd5b61008f83610057565b915061009d60208401610057565b90509250929050565b6080516101ab6100c1600039600061011501526101ab6000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063276801ec1461003b578063ff585caf14610056575b600080fd5b61004460005481565b60405190815260200160405180910390f35b61006961006436600461015c565b61006b565b005b6000610075610106565b6001549091506001600160a01b038083169116146100ca5760405162461bcd60e51b815260206004820152600e60248201526d24b73b30b634b21039b2b73232b960911b604482015260640160405180910390fd5b60008290556040518281527f13900022f509a2c2b75b4257430907a53c47c47b049f8a0a56b7a83e4e82f3999060200160405180910390a15050565b336014361080159061014957507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316816001600160a01b0316145b15610159575060131936013560601c5b90565b60006020828403121561016e57600080fd5b503591905056fea26469706673582212206fa98e7769ee8bf82b361e808ebe3c4ec6a0a73d92dcae635fe346eb136dcf3064736f6c63430008110033";

type ReceiverExampleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReceiverExampleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ReceiverExample__factory extends ContractFactory {
  constructor(...args: ReceiverExampleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _switchboard: PromiseOrValue<string>,
    _functionId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ReceiverExample> {
    return super.deploy(
      _switchboard,
      _functionId,
      overrides || {}
    ) as Promise<ReceiverExample>;
  }
  override getDeployTransaction(
    _switchboard: PromiseOrValue<string>,
    _functionId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _switchboard,
      _functionId,
      overrides || {}
    );
  }
  override attach(address: string): ReceiverExample {
    return super.attach(address) as ReceiverExample;
  }
  override connect(signer: Signer): ReceiverExample__factory {
    return super.connect(signer) as ReceiverExample__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReceiverExampleInterface {
    return new utils.Interface(_abi) as ReceiverExampleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReceiverExample {
    return new Contract(address, _abi, signerOrProvider) as ReceiverExample;
  }
}
