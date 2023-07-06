/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  OracleQueue,
  OracleQueueInterface,
} from "../../../../../contracts/src/Switchboard/oracleQueue/OracleQueue";

const _abi = [
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
        name: "accountId",
        type: "address",
      },
    ],
    name: "OracleQueueAccountInit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "attestationQueueId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "mrEnclave",
        type: "bytes32",
      },
    ],
    name: "OracleQueueAddMrEnclave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "attestationQueueId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "mrEnclave",
        type: "bytes32",
      },
    ],
    name: "OracleQueueRemoveMrEnclave",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "attestationQueueId",
        type: "address",
      },
    ],
    name: "OracleQueueSetAttestationConfig",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "authority",
        type: "address",
      },
    ],
    name: "OracleQueueSetConfig",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "granter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "grantee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "permission",
        type: "uint256",
      },
    ],
    name: "OracleQueueSetPermission",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "mrEnclave",
        type: "bytes32",
      },
    ],
    name: "addMrEnclaveToOracleQueue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        internalType: "bool",
        name: "unpermissionedFeedsEnabled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "maxSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oracleTimeout",
        type: "uint256",
      },
    ],
    name: "createOracleQueue",
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
    name: "getOracleIdx",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "getOracleQueueAllowedMrEnclaves",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "getOracles",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
    ],
    name: "oracleQueues",
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
            internalType: "address[]",
            name: "oracles",
            type: "address[]",
          },
          {
            internalType: "bool",
            name: "unpermissionedFeedsEnabled",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "maxSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "oracleTimeout",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gcIdx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currIdx",
            type: "uint256",
          },
        ],
        internalType: "struct OracleQueueLib.OracleQueue",
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
        name: "queueId",
        type: "address",
      },
    ],
    name: "queueAttestationConfigs",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "attestationQueueId",
            type: "address",
          },
          {
            internalType: "bytes32[]",
            name: "mrEnclaves",
            type: "bytes32[]",
          },
          {
            internalType: "bool",
            name: "requireValidEnclave",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "requireHeartbeatPermission",
            type: "bool",
          },
        ],
        internalType: "struct OracleQueueLib.AttestationConfig",
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
        name: "queueId",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "mrEnclave",
        type: "bytes32",
      },
    ],
    name: "removeMrEnclaveFromOracleQueue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        internalType: "address",
        name: "attestationQueueId",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "mrEnclaves",
        type: "bytes32[]",
      },
      {
        internalType: "bool",
        name: "requireValidEnclave",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "requireHeartbeatPermission",
        type: "bool",
      },
    ],
    name: "setOracleQueueAttestationConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
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
        internalType: "bool",
        name: "unpermissionedFeedsEnabled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "maxSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oracleTimeout",
        type: "uint256",
      },
    ],
    name: "setOracleQueueConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "queueId",
        type: "address",
      },
      {
        internalType: "address",
        name: "grantee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "permission",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "on",
        type: "bool",
      },
    ],
    name: "setOracleQueuePermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611b65806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638e749281116100715780638e74928114610125578063b659041114610145578063d87dd0ac14610158578063e767565114610179578063f04b0f591461018c578063f2378e88146101ac57600080fd5b806301fc1ba2146100ae578063262955d8146100c357806351a426d8146100d65780636ddc9122146100e957806388033af514610112575b600080fd5b6100c16100bc3660046113cb565b6101cc565b005b6100c16100d1366004611418565b610344565b6100c16100e4366004611418565b6103f9565b6100fc6100f7366004611442565b6105ad565b6040516101099190611464565b60405180910390f35b6100c16101203660046114fd565b610672565b610138610133366004611442565b6107d5565b6040516101099190611600565b6100c1610153366004611696565b61085c565b61016b610166366004611442565b6109c2565b604051908152602001610109565b6100c1610187366004611726565b610bbb565b61019f61019a366004611442565b610d25565b60405161010991906117a6565b6101bf6101ba366004611442565b610db7565b6040516101099190611868565b600160006101e6600080516020611ad08339815191525490565b9050806000036102065761020682600080516020611ad083398151915255565b801580159061021457508181145b156102325760405163887efaa560e01b815260040160405180910390fd5b80158015906102505750600080516020611ad0833981519152548216155b1561026e5760405163887efaa560e01b815260040160405180910390fd5b6000600080516020611b108339815191526001600160a01b0380891660009081526020839052604090206001810154929350911633146102c157604051636f6a1b8760e11b815260040160405180910390fd5b6102cd88888888610f72565b866001600160a01b0316336001600160a01b0316896001600160a01b03167f4ab602199efe705581978cabf4102049f6ee95185921d83e76dfc368067fe9758960405161031c91815260200190565b60405180910390a4505061033c81600080516020611ad083398151915255565b505050505050565b6000600080516020611b108339815191526001600160a01b03808516600090815260208390526040902060018101549293509116331461039757604051636f6a1b8760e11b815260040160405180910390fd5b60006103a285610ff9565b90506103ae8585611020565b80546040518581526001600160a01b03918216918716907ff6ce0aa504327e5ba8c211a9933cb380a53dedf29b60d4f0844729064ac029fe9060200160405180910390a35050505050565b60016000610413600080516020611ad08339815191525490565b9050806000036104335761043382600080516020611ad083398151915255565b801580159061044157508181145b1561045f5760405163887efaa560e01b815260040160405180910390fd5b801580159061047d5750600080516020611ad0833981519152548216155b1561049b5760405163887efaa560e01b815260040160405180910390fd5b6001600160a01b0384166000908152600080516020611b1083398151915260208190526040822090916104cc61112a565b60018301549091506001600160a01b038083169116146104ff57604051636f6a1b8760e11b815260040160405180910390fd5b6001600160a01b0387166000908152600080516020611af08339815191526020908152604082206001908101805491820181558352912001869055600061054588610ff9565b80546040518981529192506001600160a01b0390811691908a16907f8adde73675979995c8a86acbad75b3609a7dcf2a8efb3917585f4b446d8927e49060200160405180910390a3505050506105a781600080516020611ad083398151915255565b50505050565b604080516080810182526000808252606060208301819052928201819052918101919091526105db82610ff9565b6040805160808101825282546001600160a01b0316815260018301805483516020828102820181019095528181529294938086019392919083018282801561064257602002820191906000526020600020905b81548152602001906001019080831161062e575b50505091835250506002919091015460ff8082161515602084015261010090910416151560409091015292915050565b6004600061068c600080516020611ad08339815191525490565b9050806000036106ac576106ac82600080516020611ad083398151915255565b80158015906106ba57508181145b156106d85760405163887efaa560e01b815260040160405180910390fd5b80158015906106f65750600080516020611ad0833981519152548216155b156107145760405163887efaa560e01b815260040160405180910390fd5b6000600080516020611b108339815191526001600160a01b03808a16600090815260208390526040902060018101549293509116331461076757604051636f6a1b8760e11b815260040160405180910390fd5b6107748989898989611157565b876001600160a01b0316896001600160a01b03167fa62b3b9c0f77cdc5e48921c5696b03608cdce23ce96b44f2014bb257ddccb7c460405160405180910390a350506107cc81600080516020611ad083398151915255565b50505050505050565b6001600160a01b0381166000908152600080516020611b10833981519152602081815260409283902060020180548451818402810184019095528085526060949283018282801561084f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610831575b5050505050915050919050565b60046000610876600080516020611ad08339815191525490565b9050806000036108965761089682600080516020611ad083398151915255565b80158015906108a457508181145b156108c25760405163887efaa560e01b815260040160405180910390fd5b80158015906108e05750600080516020611ad0833981519152548216155b156108fe5760405163887efaa560e01b815260040160405180910390fd5b6001600160a01b038a81166000908152600080516020611b10833981519152602081905260409091206001015490911633811461094e57604051636f6a1b8760e11b815260040160405180910390fd5b61095e8c8c8c8c8c8c8c8c6111e7565b886001600160a01b03168c6001600160a01b03167f0d2df14c824664732d7089f8fe0a9b8399811e909a3faacd16c648a335109a3360405160405180910390a350506109b681600080516020611ad083398151915255565b50505050505050505050565b6000600080516020611b108339815191528181816109df8661126c565b600301546001600160a01b031681526020810191909152604090810160002081516101208101909252805482908290610a1790611916565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4390611916565b8015610a905780601f10610a6557610100808354040283529160200191610a90565b820191906000526020600020905b815481529060010190602001808311610a7357829003601f168201915b505050918352505060018201546001600160a01b03166020808301919091526002830180546040805182850281018501825282815294019392830182828015610b0257602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610ae4575b5050509183525050600382015460ff1615156020820152600482015460408201526005820154606082015260068201546080820152600782015460a082015260089091015460c090910152905060005b816040015151811015610baf57846001600160a01b031682604001518281518110610b7f57610b7f611950565b60200260200101516001600160a01b031603610b9d57949350505050565b80610ba78161197c565b915050610b52565b50600019949350505050565b60046000610bd5600080516020611ad08339815191525490565b905080600003610bf557610bf582600080516020611ad083398151915255565b8015801590610c0357508181145b15610c215760405163887efaa560e01b815260040160405180910390fd5b8015801590610c3f5750600080516020611ad0833981519152548216155b15610c5d5760405163887efaa560e01b815260040160405180910390fd5b6000610c676112ae565b6001600160a01b038082166000908152600080516020611b1083398151915260205260409020600101549192501615610cb3576040516363ed528560e01b815260040160405180910390fd5b610cc3818b8b8b8b8b8b8b6111e7565b806001600160a01b0316886001600160a01b03167ffd73b4fde809de38770a6f0170160c2c1a4fb8f80c80d33658e98140d64966f160405160405180910390a350610d1a81600080516020611ad083398151915255565b505050505050505050565b6001600160a01b0381166000908152600080516020611af08339815191526020908152604091829020600181018054845181850281018501909552808552606094600080516020611b108339815191529490929190830182828015610da957602002820191906000526020600020905b815481526020019060010190808311610d95575b505050505092505050919050565b610e116040518061012001604052806060815260200160006001600160a01b031681526020016060815260200160001515815260200160008152602001600081526020016000815260200160008152602001600081525090565b610e1a82611329565b60405180610120016040529081600082018054610e3690611916565b80601f0160208091040260200160405190810160405280929190818152602001828054610e6290611916565b8015610eaf5780601f10610e8457610100808354040283529160200191610eaf565b820191906000526020600020905b815481529060010190602001808311610e9257829003601f168201915b505050918352505060018201546001600160a01b03166020808301919091526002830180546040805182850281018501825282815294019392830182828015610f2157602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610f03575b5050509183525050600382015460ff1615156020820152600482015460408201526005820154606082015260068201546080820152600782015460a082015260089091015460c09091015292915050565b7fdc662b6192622eddc6e089aea0ceba83a6d6004cf0824f8f89d137cc0bb962278115610fc7576001600160a01b03808616600090815260208381526040808320938816835292905220805484179055610ff2565b6001600160a01b03808616600090815260208381526040808320938816835292905220805484191690555b5050505050565b6001600160a01b03166000908152600080516020611af08339815191526020526040902090565b6001600160a01b0382166000908152600080516020611af083398151915260205260408120600080516020611b1083398151915291805b60018301548110156110a3578483600101828154811061107957611079611950565b906000526020600020015403611091578091506110a3565b8061109b8161197c565b915050611057565b506001828101546000916110b691611995565b90508260010181815481106110cd576110cd611950565b90600052602060002001548360010183815481106110ed576110ed611950565b6000918252602090912001556001830180548061110c5761110c6119ae565b60019003818190600052602060002001600090559055505050505050565b336014361080159061114457506001600160a01b03811630145b15611154575060131936013560601c5b90565b6001600160a01b038581166000908152600080516020611af08339815191526020908152604090912080546001600160a01b0319169287169290921782558451600080516020611b1083398151915292916111b991600184019188019061133f565b50600201805461ffff191693151561ff00191693909317610100921515929092029190911790915550505050565b6001600160a01b0388166000908152600080516020611b10833981519152602081905260409091208061121b898b83611a0f565b506001810180546001600160a01b0319166001600160a01b0398909816979097179096555060038501805460ff19169415159490941790935560048401919091556005830155600690910155505050565b60007fd5e768d90a086ea7b33932448c5752ff84f596734910969a9da74dd838b9b9755b6001600160a01b039092166000908152602092909252506040902090565b6000807f20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b580546000906112e09061197c565b91829055506112f0600143611995565b4060405160200161130b929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b6000600080516020611b10833981519152611290565b82805482825590600052602060002090810192821561137a579160200282015b8281111561137a57825182559160200191906001019061135f565b5061138692915061138a565b5090565b5b80821115611386576000815560010161138b565b80356001600160a01b03811681146113b657600080fd5b919050565b803580151581146113b657600080fd5b600080600080608085870312156113e157600080fd5b6113ea8561139f565b93506113f86020860161139f565b92506040850135915061140d606086016113bb565b905092959194509250565b6000806040838503121561142b57600080fd5b6114348361139f565b946020939093013593505050565b60006020828403121561145457600080fd5b61145d8261139f565b9392505050565b602080825282516001600160a01b0316828201528281015160806040840152805160a0840181905260009291820190839060c08601905b808310156114bb578351825292840192600192909201919084019061149b565b50604087015115156060870152606087015193506114dd608087018515159052565b9695505050505050565b634e487b7160e01b600052604160045260246000fd5b600080600080600060a0868803121561151557600080fd5b61151e8661139f565b9450602061152d81880161139f565b9450604087013567ffffffffffffffff8082111561154a57600080fd5b818901915089601f83011261155e57600080fd5b813581811115611570576115706114e7565b8060051b604051601f19603f83011681018181108582111715611595576115956114e7565b60405291825284820192508381018501918c8311156115b357600080fd5b938501935b828510156115d1578435845293850193928501926115b8565b8098505050505050506115e6606087016113bb565b91506115f4608087016113bb565b90509295509295909350565b6020808252825182820181905260009190848201906040850190845b818110156116415783516001600160a01b03168352928401929184019160010161161c565b50909695505050505050565b60008083601f84011261165f57600080fd5b50813567ffffffffffffffff81111561167757600080fd5b60208301915083602082850101111561168f57600080fd5b9250929050565b60008060008060008060008060e0898b0312156116b257600080fd5b6116bb8961139f565b9750602089013567ffffffffffffffff8111156116d757600080fd5b6116e38b828c0161164d565b90985096506116f6905060408a0161139f565b945061170460608a016113bb565b979a96995094979396956080850135955060a08501359460c001359350915050565b600080600080600080600060c0888a03121561174157600080fd5b873567ffffffffffffffff81111561175857600080fd5b6117648a828b0161164d565b909850965061177790506020890161139f565b9450611785604089016113bb565b969995985093966060810135956080820135955060a0909101359350915050565b6020808252825182820181905260009190848201906040850190845b81811015611641578351835292840192918401916001016117c2565b6000815180845260005b81811015611804576020818501810151868301820152016117e8565b506000602082860101526020601f19601f83011685010191505092915050565b600081518084526020808501945080840160005b8381101561185d5781516001600160a01b031687529582019590820190600101611838565b509495945050505050565b60208152600082516101208060208501526118876101408501836117de565b915060208501516118a360408601826001600160a01b03169052565b506040850151848303601f190160608601526118bf8382611824565b92505060608501516118d5608086018215159052565b50608085015160a085015260a085015160c085015260c085015160e085015260e0850151610100818187015280870151838701525050508091505092915050565b600181811c9082168061192a57607f821691505b60208210810361194a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161198e5761198e611966565b5060010190565b818103818111156119a8576119a8611966565b92915050565b634e487b7160e01b600052603160045260246000fd5b601f821115611a0a57600081815260208120601f850160051c810160208610156119eb5750805b601f850160051c820191505b8181101561033c578281556001016119f7565b505050565b67ffffffffffffffff831115611a2757611a276114e7565b611a3b83611a358354611916565b836119c4565b6000601f841160018114611a6f5760008515611a575750838201355b600019600387901b1c1916600186901b178355610ff2565b600083815260209020601f19861690835b82811015611aa05786850135825560209485019460019092019101611a80565b5086821015611abd5760001960f88860031b161c19848701351681555b505060018560011b018355505050505056fe20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b62595278b5418f83c9fa36a8f4776a43941e2fee2d557036ff22ad4d7597c28cc2595278b5418f83c9fa36a8f4776a43941e2fee2d557036ff22ad4d7597c28cba264697066735822122012e5e107743ed8f787b2fc048aa42618cb5d446079b4c3c942d56b9a1d8f020d64736f6c63430008110033";

type OracleQueueConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OracleQueueConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OracleQueue__factory extends ContractFactory {
  constructor(...args: OracleQueueConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OracleQueue> {
    return super.deploy(overrides || {}) as Promise<OracleQueue>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OracleQueue {
    return super.attach(address) as OracleQueue;
  }
  override connect(signer: Signer): OracleQueue__factory {
    return super.connect(signer) as OracleQueue__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OracleQueueInterface {
    return new utils.Interface(_abi) as OracleQueueInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OracleQueue {
    return new Contract(address, _abi, signerOrProvider) as OracleQueue;
  }
}
