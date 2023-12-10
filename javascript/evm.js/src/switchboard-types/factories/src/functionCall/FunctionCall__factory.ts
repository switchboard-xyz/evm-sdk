/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  FunctionCall,
  FunctionCallInterface,
} from "../../../src/functionCall/FunctionCall";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "ACLNotAdmin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "ACLNotAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "functionId",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "FunctionCallerNotPermitted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "functionId",
        type: "address",
      },
    ],
    name: "FunctionDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "functionId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "received",
        type: "uint256",
      },
    ],
    name: "FunctionFeeTooLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "expectedAuthority",
        type: "address",
      },
      {
        internalType: "address",
        name: "receivedAuthority",
        type: "address",
      },
    ],
    name: "InvalidAuthority",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEntry",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "functionId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "callId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "FunctionCallEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "functionId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FunctionCallFund",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "functionId",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "params",
        type: "bytes",
      },
    ],
    name: "callFunction",
    outputs: [
      {
        internalType: "address",
        name: "callId",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "functionId",
        type: "address",
      },
    ],
    name: "functionCallSettings",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "requireEstimatedRunCostFee",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "minimumFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxGasCost",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "requireCallerPayFullCost",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "requireSenderBeReturnAddress",
            type: "bool",
          },
        ],
        internalType: "struct FunctionCallLib.FunctionCallSettings",
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
        name: "callId",
        type: "address",
      },
    ],
    name: "functionCalls",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "functionId",
            type: "address",
          },
          {
            internalType: "address",
            name: "caller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "executed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "consecutiveFailures",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feePaid",
            type: "uint256",
          },
        ],
        internalType: "struct FunctionCallLib.FunctionCall",
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
    name: "getActiveFunctionCallsByQueue",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "functionId",
            type: "address",
          },
          {
            internalType: "address",
            name: "caller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "executed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "consecutiveFailures",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "feePaid",
            type: "uint256",
          },
        ],
        internalType: "struct FunctionCallLib.FunctionCall[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "functionId",
        type: "address",
      },
      {
        internalType: "bool",
        name: "requireEstimatedRunCostFee",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "minimumFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxGasCost",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "requireCallerPayFullCost",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "requireSenderBeReturnAddress",
        type: "bool",
      },
    ],
    name: "setFunctionCallSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061242c806100206000396000f3fe60806040526004361061004a5760003560e01c80636b7ef38b1461004f578063826df326146100715780639c23da50146100a7578063a30f8d25146100d2578063fa88c651146101e6575b600080fd5b34801561005b57600080fd5b5061006f61006a366004611ee7565b610214565b005b34801561007d57600080fd5b5061009161008c366004611f4d565b610499565b60405161009e9190612020565b60405180910390f35b6100ba6100b5366004612049565b6105c8565b6040516001600160a01b03909116815260200161009e565b3480156100de57600080fd5b5061019e6100ed366004611f4d565b6040805160a0808201835260008083526020808401829052838501829052606080850183905260809485018390526001600160a01b039690961682527fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a5481529084902084519283018552805460ff9081161515845260018201549284019290925260028101549483019490945260039093015480841615159482019490945261010090930490911615159082015290565b60405161009e9190600060a082019050825115158252602083015160208301526040830151604083015260608301511515606083015260808301511515608083015292915050565b3480156101f257600080fd5b50610206610201366004611f4d565b610a2d565b60405161009e92919061210b565b6002600061022e6000805160206123b78339815191525490565b90506002826004811115610244576102446121ac565b11801561025e575061025c610257611a1f565b611a4c565b155b156102955761026b611a1f565b604051630754d25d60e51b81526001600160a01b0390911660048201526024015b60405180910390fd5b60048260048111156102a9576102a96121ac565b1480156102c357506102c16102bc611a1f565b611ad6565b155b156102f4576102d0611a1f565b6040516275103f60e11b81526001600160a01b03909116600482015260240161028c565b6001826004811115610308576103086121ac565b14801561031457508015155b156103325760405163887efaa560e01b815260040160405180910390fd5b6001811415801561034257508015155b156103605760405163887efaa560e01b815260040160405180910390fd5b610387826004811115610375576103756121ac565b6000805160206123b783398151915255565b61039088611afe565b6103b857604051631e1d8eb160e11b81526001600160a01b038916600482015260240161028c565b60006103c389611b2e565b60018101549091506001600160a01b0316331461040a57600181015460405163bf89df8360e01b81526001600160a01b03909116600482015233602482015260440161028c565b6001600160a01b03891660009081527fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a5460205260409020805460ff19168915151781556001810188905560028101879055600301805461ffff191686151561ff00191617610100861515021790555061048f816000805160206123b783398151915255565b5050505050505050565b6104a1611e6a565b6001600160a01b0382811660009081527fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a5260208181526040808420815160e08101835281548716815260018201549096169286019290925260028201549085015260038101805492949260608401919061051a906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610546906121c2565b80156105935780601f1061056857610100808354040283529160200191610593565b820191906000526020600020905b81548152906001019060200180831161057657829003601f168201915b5050509183525050600482015460ff161515602082015260058201546040820152600690910154606090910152949350505050565b6000600260006105e46000805160206123b78339815191525490565b905060028260048111156105fa576105fa6121ac565b11801561060f575061060d610257611a1f565b155b1561061c5761026b611a1f565b6004826004811115610630576106306121ac565b14801561064557506106436102bc611a1f565b155b15610652576102d0611a1f565b6001826004811115610666576106666121ac565b14801561067257508015155b156106905760405163887efaa560e01b815260040160405180910390fd5b600181141580156106a057508015155b156106be5760405163887efaa560e01b815260040160405180910390fd5b6106d3826004811115610375576103756121ac565b60006106dd611a1f565b90506106e886611afe565b61071057604051631e1d8eb160e11b81526001600160a01b038716600482015260240161028c565b600061071b87611b2e565b9050600061075c886001600160a01b031660009081527fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a546020526040902090565b6040805160a081018252825460ff908116158015835260018501546020840152600285015493830193909352600390930154808416151560608301526101009004909216151560808301529091506107f75760006107ba893a611b5e565b9050803410156107f55760405163f3663dbf60e01b81526001600160a01b038a1660048201526024810182905234604482015260640161028c565b505b6000816020015111801561080e5750806020015134105b1561084a57602081015160405163f3663dbf60e01b81526001600160a01b038a166004820152602481019190915234604482015260640161028c565b6007820154158015906108c357506108c1826006016001018054806020026020016040519081016040528092919081815260200182805480156108b657602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610898575b505050505084611bc3565b155b156108f457604051630724d91960e31b81526001600160a01b03808a1660048301528416602482015260440161028c565b6108fc611c28565b955061090b8689858a34611ca3565b7fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a5380546001810182556000919091527fd9baf67f3fd348377d9488b9802786657307b23170a8400f8ea1a97b00aee5580180546001600160a01b0319166001600160a01b038816179055856001600160a01b0316836001600160a01b0316896001600160a01b03167ff1a90642ecfa4389367880462084bb97e955b8ca43147fa46c14ba3ea9c55bbe8a6040516109c291906121fc565b60405180910390a46109d48834611dad565b604051349033906001600160a01b038b16907f31808e14ead6333a4f45ddacc0d112cf411c91d79dd91d197aeb0f58411c00cf90600090a4505050610a25816000805160206123b783398151915255565b505092915050565b6060806000805160206123d78339815191527fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a526000805b6001830154811015611143576000836001018281548110610a8757610a8761220f565b60009182526020808320909101546001600160a01b039081168084528783526040808520815160e0810183528154851681526001820154909416948401949094526002840154908301526003830180549195509192916060840191610aeb906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610b17906121c2565b8015610b645780601f10610b3957610100808354040283529160200191610b64565b820191906000526020600020905b815481529060010190602001808311610b4757829003601f168201915b5050509183525050600482015460ff161515602080830191909152600583015460408084019190915260069093015460609092019190915282516001600160a01b0316600090815290899052818120825161010081019093528054939450909282908290610bd1906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610bfd906121c2565b8015610c4a5780601f10610c1f57610100808354040283529160200191610c4a565b820191906000526020600020905b815481529060010190602001808311610c2d57829003601f168201915b505050918352505060018201546001600160a01b039081166020830152600283015481166040830152600383015416606082015260048201546080820152600582015460a09091019060ff166006811115610ca757610ca76121ac565b6006811115610cb857610cb86121ac565b81526020016006820160405180610120016040529081600082018054610cdd906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610d09906121c2565b8015610d565780601f10610d2b57610100808354040283529160200191610d56565b820191906000526020600020905b815481529060010190602001808311610d3957829003601f168201915b5050505050815260200160018201805480602002602001604051908101604052809291908181526020018280548015610db857602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610d9a575b50505050508152602001600282018054610dd1906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610dfd906121c2565b8015610e4a5780601f10610e1f57610100808354040283529160200191610e4a565b820191906000526020600020905b815481529060010190602001808311610e2d57829003601f168201915b50505050508152602001600382018054610e63906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610e8f906121c2565b8015610edc5780601f10610eb157610100808354040283529160200191610edc565b820191906000526020600020905b815481529060010190602001808311610ebf57829003601f168201915b50505050508152602001600482018054610ef5906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610f21906121c2565b8015610f6e5780601f10610f4357610100808354040283529160200191610f6e565b820191906000526020600020905b815481529060010190602001808311610f5157829003601f168201915b50505050508152602001600582018054610f87906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610fb3906121c2565b80156110005780601f10610fd557610100808354040283529160200191611000565b820191906000526020600020905b815481529060010190602001808311610fe357829003601f168201915b505050505081526020016006820180548060200260200160405190810160405280929190818152602001828054801561105857602002820191906000526020600020905b815481526020019060010190808311611044575b50505091835250506007919091015460ff80821615156020808501919091526101009283900482161515604094850152938552825161012081018452600e8701548152600f87015481860152601087015493810193909352601186015460608085019190915260128701546080850152601387015460a0850152601487015460c08501526015870154909116151560e0840152601690950154908201529101528101519091506001600160a01b038b8116911614801561111a57506080820151155b1561112d57846111298161223b565b9550505b505050808061113b9061223b565b915050610a64565b5060008167ffffffffffffffff81111561115f5761115f612033565b604051908082528060200260200182016040528015611188578160200160208202803683370190505b50905060008267ffffffffffffffff8111156111a6576111a6612033565b6040519080825280602002602001820160405280156111df57816020015b6111cc611e6a565b8152602001906001900390816111c45790505b50905060005b6001850154811015611a115760008560010182815481106112085761120861220f565b60009182526020808320909101546001600160a01b039081168084528983526040808520815160e081018352815485168152600182015490941694840194909452600284015490830152600383018054919550919291606084019161126c906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054611298906121c2565b80156112e55780601f106112ba576101008083540402835291602001916112e5565b820191906000526020600020905b8154815290600101906020018083116112c857829003601f168201915b5050509183525050600482015460ff161515602080830191909152600583015460408084019190915260069093015460609092019190915282516001600160a01b03166000908152908b9052818120825161010081019093528054939450909282908290611352906121c2565b80601f016020809104026020016040519081016040528092919081815260200182805461137e906121c2565b80156113cb5780601f106113a0576101008083540402835291602001916113cb565b820191906000526020600020905b8154815290600101906020018083116113ae57829003601f168201915b505050918352505060018201546001600160a01b039081166020830152600283015481166040830152600383015416606082015260048201546080820152600582015460a09091019060ff166006811115611428576114286121ac565b6006811115611439576114396121ac565b8152602001600682016040518061012001604052908160008201805461145e906121c2565b80601f016020809104026020016040519081016040528092919081815260200182805461148a906121c2565b80156114d75780601f106114ac576101008083540402835291602001916114d7565b820191906000526020600020905b8154815290600101906020018083116114ba57829003601f168201915b505050505081526020016001820180548060200260200160405190810160405280929190818152602001828054801561153957602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161151b575b50505050508152602001600282018054611552906121c2565b80601f016020809104026020016040519081016040528092919081815260200182805461157e906121c2565b80156115cb5780601f106115a0576101008083540402835291602001916115cb565b820191906000526020600020905b8154815290600101906020018083116115ae57829003601f168201915b505050505081526020016003820180546115e4906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054611610906121c2565b801561165d5780601f106116325761010080835404028352916020019161165d565b820191906000526020600020905b81548152906001019060200180831161164057829003601f168201915b50505050508152602001600482018054611676906121c2565b80601f01602080910402602001604051908101604052809291908181526020018280546116a2906121c2565b80156116ef5780601f106116c4576101008083540402835291602001916116ef565b820191906000526020600020905b8154815290600101906020018083116116d257829003601f168201915b50505050508152602001600582018054611708906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054611734906121c2565b80156117815780601f1061175657610100808354040283529160200191611781565b820191906000526020600020905b81548152906001019060200180831161176457829003601f168201915b50505050508152602001600682018054806020026020016040519081016040528092919081815260200182805480156117d957602002820191906000526020600020905b8154815260200190600101908083116117c5575b50505091835250506007919091015460ff80821615156020808501919091526101009283900482161515604094850152938552825161012081018452600e8701548152600f87015481860152601087015493810193909352601186015460608085019190915260128701546080850152601387015460a0850152601487015460c08501526015870154909116151560e0840152601690950154908201529101528101519091506001600160a01b038d8116911614801561189b57506080820151155b156119fb576001600160a01b03808416600090815260208a8152604091829020825160e0810184528154851681526001820154909416918401919091526002810154918301919091526003810180546060840191906118f9906121c2565b80601f0160208091040260200160405190810160405280929190818152602001828054611925906121c2565b80156119725780601f1061194757610100808354040283529160200191611972565b820191906000526020600020905b81548152906001019060200180831161195557829003601f168201915b5050509183525050600482015460ff161515602082015260058201546040820152600690910154606090910152856119a989612254565b985088815181106119bc576119bc61220f565b6020026020010181905250828688815181106119da576119da61220f565b60200260200101906001600160a01b031690816001600160a01b0316815250505b5050508080611a099061223b565b9150506111e5565b509097909650945050505050565b3360143610801590611a3957506001600160a01b03811630145b15611a49575060131936013560601c5b90565b6001600160a01b03811660009081527fec717508ea0d3d9f736b2da60dd18c1864c124710105fae8984f76b69eb3c825602052604081205460ff1680611ad057507fec717508ea0d3d9f736b2da60dd18c1864c124710105fae8984f76b69eb3c8235b6001600160a01b0383166000908152600191909101602052604090205460ff165b92915050565b60007fec717508ea0d3d9f736b2da60dd18c1864c124710105fae8984f76b69eb3c823611aaf565b6001600160a01b0390811660009081526000805160206123d7833981519152602052604090206001015416151590565b60006000805160206123d78339815191525b6001600160a01b039092166000908152602092909252506040902090565b6001600160a01b0382811660009081526000805160206123d7833981519152602052604081206003810154919290918391611b999116611e42565b600301546011830154909150611baf818361226b565b611bb9908661227e565b9695505050505050565b6000805b8351811015611c1e57826001600160a01b0316848281518110611bec57611bec61220f565b60200260200101516001600160a01b031603611c0c576001915050611ad0565b80611c168161223b565b915050611bc7565b5060009392505050565b6000807f20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b58054600090611c5a9061223b565b9182905550611c6a600143612295565b40604051602001611c85929190918252602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b6040518060e00160405280856001600160a01b03168152602001846001600160a01b031681526020014281526020018381526020016000151581526020016000815260200182815250611d137fac917e5a91e3acb656f85d06b7b48bef4356fe56119fafe1fa91bc7497fe3a5290565b6001600160a01b0380881660009081526020928352604090819020845181549084166001600160a01b03199182161782559385015160018201805491909416941693909317909155820151600282015560608201516003820190611d7790826122f6565b50608082015160048201805460ff191691151591909117905560a0820151600582015560c0909101516006909101555050505050565b6001600160a01b03821660009081526000805160206123d7833981519152602052604081206004018054839290611de590849061226b565b90915550506001600160a01b03821660009081526000805160206123d783398151915260205260409020600581015460049060ff166006811115611e2b57611e2b6121ac565b03611e3d5760058101805460ff191690555b505050565b60007f60afd68830977364a6093883acfe9f98da214c7c3590e74cf82ad9ef006ddc3e611b40565b6040518060e0016040528060006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016060815260200160001515815260200160008152602001600081525090565b80356001600160a01b0381168114611ed257600080fd5b919050565b80358015158114611ed257600080fd5b60008060008060008060c08789031215611f0057600080fd5b611f0987611ebb565b9550611f1760208801611ed7565b94506040870135935060608701359250611f3360808801611ed7565b9150611f4160a08801611ed7565b90509295509295509295565b600060208284031215611f5f57600080fd5b611f6882611ebb565b9392505050565b6000815180845260005b81811015611f9557602081850181015186830182015201611f79565b506000602082860101526020601f19601f83011685010191505092915050565b600060018060a01b038083511684528060208401511660208501525060408201516040840152606082015160e06060850152611ff460e0850182611f6f565b905060808301511515608085015260a083015160a085015260c083015160c08501528091505092915050565b602081526000611f686020830184611fb5565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561205c57600080fd5b61206583611ebb565b9150602083013567ffffffffffffffff8082111561208257600080fd5b818501915085601f83011261209657600080fd5b8135818111156120a8576120a8612033565b604051601f8201601f19908116603f011681019083821181831017156120d0576120d0612033565b816040528281528860208487010111156120e957600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b604080825283519082018190526000906020906060840190828701845b8281101561214d5781516001600160a01b031684529284019290840190600101612128565b50505083810382850152845180825282820190600581901b8301840187850160005b8381101561219d57601f1986840301855261218b838351611fb5565b9487019492509086019060010161216f565b50909998505050505050505050565b634e487b7160e01b600052602160045260246000fd5b600181811c908216806121d657607f821691505b6020821081036121f657634e487b7160e01b600052602260045260246000fd5b50919050565b602081526000611f686020830184611f6f565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161224d5761224d612225565b5060010190565b60008161226357612263612225565b506000190190565b80820180821115611ad057611ad0612225565b8082028115828204841417611ad057611ad0612225565b81810381811115611ad057611ad0612225565b601f821115611e3d57600081815260208120601f850160051c810160208610156122cf5750805b601f850160051c820191505b818110156122ee578281556001016122db565b505050505050565b815167ffffffffffffffff81111561231057612310612033565b6123248161231e84546121c2565b846122a8565b602080601f83116001811461235957600084156123415750858301515b600019600386901b1c1916600185901b1785556122ee565b600085815260208120601f198616915b8281101561238857888601518255948401946001909101908401612369565b50858210156123a65787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fe20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b672050865ba43dca306a7c9a249316457b134cf9751dcee5ef976e9d66668f897a2646970667358221220f2262fb618063347a83dae9a1a5c154446ae564ba6c677eaa2ba0092662f36c764736f6c63430008110033";

type FunctionCallConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FunctionCallConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FunctionCall__factory extends ContractFactory {
  constructor(...args: FunctionCallConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FunctionCall> {
    return super.deploy(overrides || {}) as Promise<FunctionCall>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FunctionCall {
    return super.attach(address) as FunctionCall;
  }
  override connect(signer: Signer): FunctionCall__factory {
    return super.connect(signer) as FunctionCall__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FunctionCallInterface {
    return new utils.Interface(_abi) as FunctionCallInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FunctionCall {
    return new Contract(address, _abi, signerOrProvider) as FunctionCall;
  }
}
