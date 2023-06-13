/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Oracle, OracleInterface } from "../../oracle/Oracle";

const _abi = [
  {
    inputs: [],
    name: "InvalidArgument",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAuthority",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEntry",
    type: "error",
  },
  {
    inputs: [],
    name: "OracleAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "PermissionDenied",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "OracleAccountInit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oracleId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "OracleGC",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "createOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oracleId",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "createOracleWithId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oracleId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "oracleIdx",
        type: "uint256",
      },
    ],
    name: "oracleGarbageCollect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oracleId",
        type: "address",
      },
    ],
    name: "oracleHeartbeat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oracleId",
        type: "address",
      },
    ],
    name: "oracles",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "authority",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "numRows",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "lastHeartbeat",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "queueId",
            type: "address",
          },
        ],
        internalType: "struct OracleLib.Oracle",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oracleId",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "setOracleConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506111a7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80633e61135f146100675780636fb7651a1461007c57806371da68ff1461008f578063addd5099146100a2578063ed4d4e47146100cb578063f53b638c146100de575b600080fd5b61007a610075366004610cd4565b6100f1565b005b61007a61008a366004610d4a565b61016f565b61007a61009d366004610daf565b61018f565b6100b56100b0366004610dd9565b6102f9565b6040516100c29190610dfb565b60405180910390f35b61007a6100d9366004610cd4565b610333565b61007a6100ec366004610dd9565b6103d0565b60006100fc866107f9565b905080602001516001600160a01b0316336001600160a01b03161461013457604051636f6a1b8760e11b815260040160405180910390fd5b604081015160ff161561015a5760405163a9cb9e0d60e01b815260040160405180910390fd5b610167868686868661092b565b505050505050565b6000610179610993565b90506101888186868686610333565b5050505050565b6001600160a01b038281166000908152600080516020611152833981519152602081905260408220600381015491939092916101cb9116610a0e565b6001830154909150600160a01b900460ff166000036101fd5760405163a9cb9e0d60e01b815260040160405180910390fd5b846001600160a01b031681600201858154811061021c5761021c610e9b565b6000918252602090912001546001600160a01b03161461024f5760405163a9cb9e0d60e01b815260040160405180910390fd5b60018201546001600160a01b0316331480610293575060068101546001600160a01b038616600090815260208590526040902060020154429161029191610ec7565b105b156101885760038201546040516001600160a01b03918216918716907f687acf5b3ff62e7f43ce582f87921873586d32d7e139aea211bdaaf4e6a2da7890600090a3836102e1866000610a35565b6003830154610167906001600160a01b031682610a7d565b6040805160a08101825260608082526000602083018190529282018390528101829052608081019190915261032d826107f9565b92915050565b6001600160a01b0380861660009081526000805160206111528339815191526020526040902060010154161561037c576040516363ed528560e01b815260040160405180910390fd5b610389858585858561092b565b846001600160a01b0316826001600160a01b03167f794f588d9b82935f6086d1ac31de2c6bc6f36a758868e90e2e5583f8e21d30f360405160405180910390a35050505050565b600160006103ea6000805160206111128339815191525490565b90508060000361040a5761040a8260008051602061111283398151915255565b81810361042a5760405163887efaa560e01b815260040160405180910390fd5b80158015906104485750600080516020611112833981519152548216155b156104665760405163887efaa560e01b815260040160405180910390fd5b6001600160a01b038381166000908152600080516020611152833981519152602081905260408220600381015491939092916104a29116610a0e565b60038301546001600160a01b031660008181527f2595278b5418f83c9fa36a8f4776a43941e2fee2d557036ff22ad4d7597c28cc602052604081209293509061053e90896104ef84610bbb565b6001600160a01b0392831660009081527fdc662b6192622eddc6e089aea0ceba83a6d6004cf0824f8f89d137cc0bb9622760209081526040808320949095168252929092529190205416151590565b9050600061054a610bdb565b60018601549091506001600160a01b0380831691161461057d57604051636f6a1b8760e11b815260040160405180910390fd5b600283015460ff16156106255782546040516302eab4ff60e31b81523091631755a7f8916105c09185916001600160a01b03909116906001890190600401610eda565b60006040518083038186803b1580156105d857600080fd5b505afa1580156105ec573d6000803e3d6000fd5b505050506002830154610100900460ff168015610607575081155b1561062557604051630782484160e21b815260040160405180910390fd5b600283015460ff16158015610638575081155b1561065657604051630782484160e21b815260040160405180910390fd5b610687896001600160a01b031660009081526000805160206111528339815191526020526040902042600290910155565b6001850154600160a01b900460ff166000036106fc576106a8896001610a35565b60038501546001600160a01b039081166000908152600080516020611132833981519152602090815260408220600201805460018101825590835291200180546001600160a01b031916918b169190911790555b600084600701549050600085600201828154811061071c5761071c610e9b565b60009182526020909120015460038801546001600160a01b0391821692506107449116610c08565b60068601546001600160a01b038216600090815260208a90526040902060020154429161077091610ec7565b10156107d65760038701546040516001600160a01b03918216918316907f687acf5b3ff62e7f43ce582f87921873586d32d7e139aea211bdaaf4e6a2da7890600090a36107be8b6000610a35565b60038701546107d6906001600160a01b031683610a7d565b50505050505050506107f48160008051602061111283398151915255565b505050565b6040805160a0810182526060808252600060208301819052928201839052810182905260808101919091526000805160206111528339815191526001600160a01b0383166000908152602091909152604090819020815160a0810190925280548290829061086690610f41565b80601f016020809104026020016040519081016040528092919081815260200182805461089290610f41565b80156108df5780601f106108b4576101008083540402835291602001916108df565b820191906000526020600020905b8154815290600101906020018083116108c257829003601f168201915b505050918352505060018201546001600160a01b038082166020840152600160a01b90910460ff1660408301526002830154606083015260039092015490911660809091015292915050565b6001600160a01b0385166000908152600080516020611152833981519152602052604090208061095c858783610fd7565b506001810180546001600160a01b039485166001600160a01b03199182161790915560039091018054929093169116179055505050565b6000807f20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b580546000906109c590611097565b91829055506109d56001436110b0565b406040516020016109f0929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b6001600160a01b031660009081526000805160206111328339815191526020526040902090565b6001600160a01b0391909116600090815260008051602061115283398151915260205260409020600101805460ff909216600160a01b0260ff60a01b19909216919091179055565b6001600160a01b0382166000908152600080516020611132833981519152602081905260408220600281015491929091610ab9906001906110b0565b9050816002018181548110610ad057610ad0610e9b565b6000918252602090912001546002830180546001600160a01b039092169186908110610afe57610afe610e9b565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555081600201805480610b3f57610b3f6110c3565b600082815260208120820160001990810180546001600160a01b031916905590910190915560028301549003610b82576000600783018190556008830155610188565b60028201546007830154610b9691906110d9565b600783015560028201546008830154610baf91906110d9565b60088301555050505050565b600080826002811115610bd057610bd06110fb565b6001901b9392505050565b3360143610801590610bf557506001600160a01b03811630145b15610c05575060131936013560601c5b90565b6001600160a01b038116600090815260008051602061113283398151915260208190526040909120600281015415610c635760028101546007820154610c4f906001610ec7565b610c5991906110d9565b6007820155505050565b60006007820155505050565b80356001600160a01b0381168114610c8657600080fd5b919050565b60008083601f840112610c9d57600080fd5b50813567ffffffffffffffff811115610cb557600080fd5b602083019150836020828501011115610ccd57600080fd5b9250929050565b600080600080600060808688031215610cec57600080fd5b610cf586610c6f565b9450602086013567ffffffffffffffff811115610d1157600080fd5b610d1d88828901610c8b565b9095509350610d30905060408701610c6f565b9150610d3e60608701610c6f565b90509295509295909350565b60008060008060608587031215610d6057600080fd5b843567ffffffffffffffff811115610d7757600080fd5b610d8387828801610c8b565b9095509350610d96905060208601610c6f565b9150610da460408601610c6f565b905092959194509250565b60008060408385031215610dc257600080fd5b610dcb83610c6f565b946020939093013593505050565b600060208284031215610deb57600080fd5b610df482610c6f565b9392505050565b60006020808352835160a08285015280518060c086015260005b81811015610e315782810184015186820160e001528301610e15565b50600060e08287010152918501516001600160a01b038116604086015291604086015160ff8116606087015292506060860151608086015260808601519250610e8560a08601846001600160a01b03169052565b601f01601f19169390930160e001949350505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b8082018082111561032d5761032d610eb1565b6001600160a01b03848116825283166020808301919091526060604083018190528354908301819052600084815282812090929091608085019190845b81811015610f3357845484526001948501949383019301610f17565b509198975050505050505050565b600181811c90821680610f5557607f821691505b602082108103610f7557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b601f8211156107f457600081815260208120601f850160051c81016020861015610fb85750805b601f850160051c820191505b8181101561016757828155600101610fc4565b67ffffffffffffffff831115610fef57610fef610f7b565b61100383610ffd8354610f41565b83610f91565b6000601f841160018114611037576000851561101f5750838201355b600019600387901b1c1916600186901b178355610188565b600083815260209020601f19861690835b828110156110685786850135825560209485019460019092019101611048565b50868210156110855760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6000600182016110a9576110a9610eb1565b5060010190565b8181038181111561032d5761032d610eb1565b634e487b7160e01b600052603160045260246000fd5b6000826110f657634e487b7160e01b600052601260045260246000fd5b500690565b634e487b7160e01b600052602160045260246000fdfe20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b62595278b5418f83c9fa36a8f4776a43941e2fee2d557036ff22ad4d7597c28cbd5e768d90a086ea7b33932448c5752ff84f596734910969a9da74dd838b9b975a2646970667358221220d8b086ccdfd14f0e41df71c388e4da4e87d80e504d72023181759c89237b23b764736f6c63430008110033";

type OracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Oracle__factory extends ContractFactory {
  constructor(...args: OracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Oracle> {
    return super.deploy(overrides || {}) as Promise<Oracle>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Oracle {
    return super.attach(address) as Oracle;
  }
  override connect(signer: Signer): Oracle__factory {
    return super.connect(signer) as Oracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OracleInterface {
    return new utils.Interface(_abi) as OracleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Oracle {
    return new Contract(address, _abi, signerOrProvider) as Oracle;
  }
}
