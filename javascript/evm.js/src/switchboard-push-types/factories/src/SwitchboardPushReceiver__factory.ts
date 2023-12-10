/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SwitchboardPushReceiver,
  SwitchboardPushReceiverInterface,
} from "../../src/SwitchboardPushReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_diamondCutFacet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initializationContractAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "InitializationFunctionReverted",
    type: "error",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200247038038062002470833981016040819052620000349162001032565b81816200004c826200016860201b620000b61760201c565b604080516001808252818301909252600091816020015b60408051606080820183526000808352602083015291810191909152815260200190600190039081620000635750506040805160018082528183019092529192506000919060208083019080368337019050509050631f931c1c60e01b81600081518110620000d657620000d66200106a565b6001600160e01b031990921660209283029190910182015260408051606081019091526001600160a01b03851681529081016000815260200182815250826000815181106200012957620001296200106a565b60200260200101819052506200015c82600060405180602001604052806000815250620001ec60201b620001391760201c565b505050505050620012ee565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c132080546001600160a01b031981166001600160a01b03848116918217909355604051600080516020620023c4833981519152939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b60005b8351811015620003f85760008482815181106200021057620002106200106a565b60200260200101516020015190506000600281111562000234576200023462001080565b81600281111562000249576200024962001080565b03620002a757620002a18583815181106200026857620002686200106a565b6020026020010151600001518684815181106200028957620002896200106a565b6020026020010151604001516200044760201b60201c565b620003e2565b6001816002811115620002be57620002be62001080565b036200031657620002a1858381518110620002dd57620002dd6200106a565b602002602001015160000151868481518110620002fe57620002fe6200106a565b602002602001015160400151620006d460201b60201c565b60028160028111156200032d576200032d62001080565b036200038557620002a18583815181106200034c576200034c6200106a565b6020026020010151600001518684815181106200036d576200036d6200106a565b6020026020010151604001516200096c60201b60201c565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f727265637420466163657443756044820152663a20b1ba34b7b760c91b60648201526084015b60405180910390fd5b5080620003ef81620010ac565b915050620001ef565b507f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb6738383836040516200042e939291906200111c565b60405180910390a162000442828262000ad2565b505050565b60008151116200049d5760405162461bcd60e51b815260206004820152602b60248201526000805160206200245083398151915260448201526a1858d95d081d1bc818dd5d60aa1b6064820152608401620003d9565b600080516020620023c48339815191526001600160a01b038316620005095760405162461bcd60e51b815260206004820152602c60248201526000805160206200240c83398151915260448201526b65206164647265737328302960a01b6064820152608401620003d9565b6001600160a01b0383166000908152600182016020526040812054906001600160601b0382169003620005425762000542828562000ba4565b60005b8351811015620006cd5760008482815181106200056657620005666200106a565b6020908102919091018101516001600160e01b031981166000908152918690526040909120549091506001600160a01b031680156200060e5760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f60448201527f6e207468617420616c72656164792065786973747300000000000000000000006064820152608401620003d9565b6001600160e01b0319821660008181526020878152604080832080546001600160a01b03908116600160a01b6001600160601b038c16021782558c168085526001808c0185529285208054938401815585528385206008840401805463ffffffff60079095166004026101000a948502191660e08a901c94909402939093179092559390925287905281546001600160a01b03191617905583620006b28162001223565b94505050508080620006c490620010ac565b91505062000545565b5050505050565b60008151116200072a5760405162461bcd60e51b815260206004820152602b60248201526000805160206200245083398151915260448201526a1858d95d081d1bc818dd5d60aa1b6064820152608401620003d9565b600080516020620023c48339815191526001600160a01b038316620007965760405162461bcd60e51b815260206004820152602c60248201526000805160206200240c83398151915260448201526b65206164647265737328302960a01b6064820152608401620003d9565b6001600160a01b0383166000908152600182016020526040812054906001600160601b0382169003620007cf57620007cf828562000ba4565b60005b8351811015620006cd576000848281518110620007f357620007f36200106a565b6020908102919091018101516001600160e01b031981166000908152918690526040909120549091506001600160a01b039081169087168103620008a05760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e20776974682073616d652066756e6374696f6e00000000000000006064820152608401620003d9565b620008ad85828462000c11565b6001600160e01b0319821660008181526020878152604080832080546001600160a01b03908116600160a01b6001600160601b038c16021782558c168085526001808c0185529285208054938401815585528385206008840401805463ffffffff60079095166004026101000a948502191660e08a901c94909402939093179092559390925287905281546001600160a01b03191617905583620009518162001223565b945050505080806200096390620010ac565b915050620007d2565b6000815111620009c25760405162461bcd60e51b815260206004820152602b60248201526000805160206200245083398151915260448201526a1858d95d081d1bc818dd5d60aa1b6064820152608401620003d9565b600080516020620023c48339815191526001600160a01b0383161562000a515760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f7665206661636574206164647260448201527f657373206d7573742062652061646472657373283029000000000000000000006064820152608401620003d9565b60005b825181101562000acc57600083828151811062000a755762000a756200106a565b6020908102919091018101516001600160e01b031981166000908152918590526040909120549091506001600160a01b031662000ab484828462000c11565b5050808062000ac390620010ac565b91505062000a54565b50505050565b6001600160a01b03821662000ae5575050565b62000b0a82604051806060016040528060288152602001620023e46028913962000ff1565b600080836001600160a01b03168360405162000b27919062001254565b600060405180830381855af49150503d806000811462000b64576040519150601f19603f3d011682016040523d82523d6000602084013e62000b69565b606091505b50915091508162000acc5780511562000b855780518082602001fd5b838360405163192105d760e01b8152600401620003d992919062001272565b62000bc9816040518060600160405280602481526020016200242c6024913962000ff1565b6002820180546001600160a01b0390921660008181526001948501602090815260408220860185905594840183559182529290200180546001600160a01b0319169091179055565b6001600160a01b03821662000c8f5760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e27742065786973740000000000000000006064820152608401620003d9565b306001600160a01b0383160362000d005760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201526d3a30b1363290333ab731ba34b7b760911b6064820152608401620003d9565b6001600160e01b03198116600090815260208481526040808320546001600160a01b0386168452600180880190935290832054600160a01b9091046001600160601b0316929162000d5191620012a0565b905080821462000e4a576001600160a01b0384166000908152600186016020526040812080548390811062000d8a5762000d8a6200106a565b600091825260208083206008830401546001600160a01b038916845260018a019091526040909220805460079092166004026101000a90920460e01b92508291908590811062000dde5762000dde6200106a565b600091825260208083206008830401805463ffffffff60079094166004026101000a938402191660e09590951c929092029390931790556001600160e01b03199290921682528690526040902080546001600160a01b0316600160a01b6001600160601b038516021790555b6001600160a01b0384166000908152600186016020526040902080548062000e765762000e76620012bc565b60008281526020808220600860001990940193840401805463ffffffff600460078716026101000a0219169055919092556001600160e01b03198516825286905260408120819055819003620006cd57600285015460009062000edc90600190620012a0565b6001600160a01b038616600090815260018089016020526040909120015490915080821462000f9257600087600201838154811062000f1f5762000f1f6200106a565b6000918252602090912001546002890180546001600160a01b03909216925082918490811062000f535762000f536200106a565b600091825260208083209190910180546001600160a01b0319166001600160a01b03948516179055929091168152600189810190925260409020018190555b8660020180548062000fa85762000fa8620012bc565b60008281526020808220830160001990810180546001600160a01b03191690559092019092556001600160a01b0388168252600189810190915260408220015550505050505050565b813b818162000acc5760405162461bcd60e51b8152600401620003d99190620012d2565b80516001600160a01b03811681146200102d57600080fd5b919050565b600080604083850312156200104657600080fd5b620010518362001015565b9150620010616020840162001015565b90509250929050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201620010c157620010c162001096565b5060010190565b60005b83811015620010e5578181015183820152602001620010cb565b50506000910152565b6000815180845262001108816020860160208601620010c8565b601f01601f19169290920160200192915050565b60006060808301818452808751808352608092508286019150828160051b8701016020808b0160005b84811015620011f157898403607f19018652815180516001600160a01b031685528381015189860190600381106200118d57634e487b7160e01b600052602160045260246000fd5b868601526040918201519186018a905281519081905290840190600090898701905b80831015620011db5783516001600160e01b0319168252928601926001929092019190860190620011af565b5097850197955050509082019060010162001145565b50506001600160a01b038a16908801528681036040880152620012158189620010ee565b9a9950505050505050505050565b60006001600160601b038281166002600160601b031981016200124a576200124a62001096565b6001019392505050565b6000825162001268818460208701620010c8565b9190910192915050565b6001600160a01b03831681526040602082018190526000906200129890830184620010ee565b949350505050565b81810381811115620012b657620012b662001096565b92915050565b634e487b7160e01b600052603160045260246000fd5b602081526000620012e76020830184620010ee565b9392505050565b6110c680620012fe6000396000f3fe60806040523661000b57005b600080356001600160e01b0319168152600080516020611025833981519152602081905260409091205481906001600160a01b0316806100925760405162461bcd60e51b815260206004820181905260248201527f4469616d6f6e643a2046756e6374696f6e20646f6573206e6f7420657869737460448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e8080156100b1573d6000f35b3d6000fd5b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c132080546001600160a01b031981166001600160a01b03848116918217909355604051600080516020611025833981519152939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b60005b83518110156102ff57600084828151811061015957610159610d2b565b60200260200101516020015190506000600281111561017a5761017a610d41565b81600281111561018c5761018c610d41565b036101da576101d58583815181106101a6576101a6610d2b565b6020026020010151600001518684815181106101c4576101c4610d2b565b60200260200101516040015161034a565b6102ec565b60018160028111156101ee576101ee610d41565b03610237576101d585838151811061020857610208610d2b565b60200260200101516000015186848151811061022657610226610d2b565b6020026020010151604001516104c9565b600281600281111561024b5761024b610d41565b03610294576101d585838151811061026557610265610d2b565b60200260200101516000015186848151811061028357610283610d2b565b602002602001015160400151610659565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f727265637420466163657443756044820152663a20b1ba34b7b760c91b6064820152608401610089565b50806102f781610d6d565b91505061013c565b507f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb67383838360405161033393929190610dd6565b60405180910390a16103458282610777565b505050565b600081511161036b5760405162461bcd60e51b815260040161008990610ed6565b6000805160206110258339815191526001600160a01b0383166103a05760405162461bcd60e51b815260040161008990610f21565b6001600160a01b0383166000908152600182016020526040812054906001600160601b03821690036103d6576103d6828561083d565b60005b83518110156104c25760008482815181106103f6576103f6610d2b565b6020908102919091018101516001600160e01b031981166000908152918690526040909120549091506001600160a01b031680156104945760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f6044820152746e207468617420616c72656164792065786973747360581b6064820152608401610089565b6104a08583868a6108a7565b836104aa81610f6d565b945050505080806104ba90610d6d565b9150506103d9565b5050505050565b60008151116104ea5760405162461bcd60e51b815260040161008990610ed6565b6000805160206110258339815191526001600160a01b03831661051f5760405162461bcd60e51b815260040161008990610f21565b6001600160a01b0383166000908152600182016020526040812054906001600160601b038216900361055557610555828561083d565b60005b83518110156104c257600084828151811061057557610575610d2b565b6020908102919091018101516001600160e01b031981166000908152918690526040909120549091506001600160a01b0390811690871681036106205760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e20776974682073616d652066756e6374696f6e00000000000000006064820152608401610089565b61062b858284610947565b6106378583868a6108a7565b8361064181610f6d565b9450505050808061065190610d6d565b915050610558565b600081511161067a5760405162461bcd60e51b815260040161008990610ed6565b6000805160206110258339815191526001600160a01b038316156106ff5760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f76652066616365742061646472604482015275657373206d757374206265206164647265737328302960501b6064820152608401610089565b60005b825181101561077157600083828151811061071f5761071f610d2b565b6020908102919091018101516001600160e01b031981166000908152918590526040909120549091506001600160a01b031661075c848284610947565b5050808061076990610d6d565b915050610702565b50505050565b6001600160a01b038216610789575050565b6107ab8260405180606001604052806028815260200161104560289139610d0a565b600080836001600160a01b0316836040516107c69190610f93565b600060405180830381855af49150503d8060008114610801576040519150601f19603f3d011682016040523d82523d6000602084013e610806565b606091505b509150915081610771578051156108205780518082602001fd5b838360405163192105d760e01b8152600401610089929190610faf565b61085f8160405180606001604052806024815260200161106d60249139610d0a565b6002820180546001600160a01b0390921660008181526001948501602090815260408220860185905594840183559182529290200180546001600160a01b0319169091179055565b6001600160e01b0319831660008181526020868152604080832080546001600160601b03909716600160a01b026001600160a01b0397881617815594909516808352600180890183529583208054968701815583528183206008870401805460e09890981c60046007909816979097026101000a96870263ffffffff9097021990971695909517909555529290915281546001600160a01b031916179055565b6001600160a01b0382166109c35760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e27742065786973740000000000000000006064820152608401610089565b306001600160a01b03831603610a325760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201526d3a30b1363290333ab731ba34b7b760911b6064820152608401610089565b6001600160e01b03198116600090815260208481526040808320546001600160a01b0386168452600180880190935290832054600160a01b9091046001600160601b03169291610a8191610fdb565b9050808214610b73576001600160a01b03841660009081526001860160205260408120805483908110610ab657610ab6610d2b565b600091825260208083206008830401546001600160a01b038916845260018a019091526040909220805460079092166004026101000a90920460e01b925082919085908110610b0757610b07610d2b565b600091825260208083206008830401805463ffffffff60079094166004026101000a938402191660e09590951c929092029390931790556001600160e01b03199290921682528690526040902080546001600160a01b0316600160a01b6001600160601b038516021790555b6001600160a01b03841660009081526001860160205260409020805480610b9c57610b9c610ff4565b60008281526020808220600860001990940193840401805463ffffffff600460078716026101000a0219169055919092556001600160e01b031985168252869052604081208190558190036104c2576002850154600090610bff90600190610fdb565b6001600160a01b0386166000908152600180890160205260409091200154909150808214610cae576000876002018381548110610c3e57610c3e610d2b565b6000918252602090912001546002890180546001600160a01b039092169250829184908110610c6f57610c6f610d2b565b600091825260208083209190910180546001600160a01b0319166001600160a01b03948516179055929091168152600189810190925260409020018190555b86600201805480610cc157610cc1610ff4565b60008281526020808220830160001990810180546001600160a01b03191690559092019092556001600160a01b0388168252600189810190915260408220015550505050505050565b813b81816107715760405162461bcd60e51b8152600401610089919061100a565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610d7f57610d7f610d57565b5060010190565b60005b83811015610da1578181015183820152602001610d89565b50506000910152565b60008151808452610dc2816020860160208601610d86565b601f01601f19169290920160200192915050565b60006060808301818452808751808352608092508286019150828160051b8701016020808b0160005b84811015610ea657898403607f19018652815180516001600160a01b03168552838101518986019060038110610e4557634e487b7160e01b600052602160045260246000fd5b868601526040918201519186018a905281519081905290840190600090898701905b80831015610e915783516001600160e01b0319168252928601926001929092019190860190610e67565b50978501979550505090820190600101610dff565b50506001600160a01b038a16908801528681036040880152610ec88189610daa565b9a9950505050505050505050565b6020808252602b908201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660408201526a1858d95d081d1bc818dd5d60aa1b606082015260800190565b6020808252602c908201527f4c69624469616d6f6e644375743a204164642066616365742063616e2774206260408201526b65206164647265737328302960a01b606082015260800190565b60006001600160601b03808316818103610f8957610f89610d57565b6001019392505050565b60008251610fa5818460208701610d86565b9190910192915050565b6001600160a01b0383168152604060208201819052600090610fd390830184610daa565b949350505050565b81810381811115610fee57610fee610d57565b92915050565b634e487b7160e01b600052603160045260246000fd5b60208152600061101d6020830184610daa565b939250505056fec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c4c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a204e657720666163657420686173206e6f20636f6465a2646970667358221220e7a6d8cc9d110252a622c0d9ffb1de7de6953a89c088cb14f4cc102e74199b5b64736f6c63430008110033c8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c4c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a204164642066616365742063616e277420624c69624469616d6f6e644375743a204e657720666163657420686173206e6f20636f64654c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e2066";

type SwitchboardPushReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SwitchboardPushReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SwitchboardPushReceiver__factory extends ContractFactory {
  constructor(...args: SwitchboardPushReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _contractOwner: PromiseOrValue<string>,
    _diamondCutFacet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SwitchboardPushReceiver> {
    return super.deploy(
      _contractOwner,
      _diamondCutFacet,
      overrides || {}
    ) as Promise<SwitchboardPushReceiver>;
  }
  override getDeployTransaction(
    _contractOwner: PromiseOrValue<string>,
    _diamondCutFacet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _contractOwner,
      _diamondCutFacet,
      overrides || {}
    );
  }
  override attach(address: string): SwitchboardPushReceiver {
    return super.attach(address) as SwitchboardPushReceiver;
  }
  override connect(signer: Signer): SwitchboardPushReceiver__factory {
    return super.connect(signer) as SwitchboardPushReceiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwitchboardPushReceiverInterface {
    return new utils.Interface(_abi) as SwitchboardPushReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwitchboardPushReceiver {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SwitchboardPushReceiver;
  }
}