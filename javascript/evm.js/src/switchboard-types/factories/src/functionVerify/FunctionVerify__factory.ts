/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  FunctionVerify,
  FunctionVerifyInterface,
} from "../../../src/functionVerify/FunctionVerify";

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
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
    ],
    name: "AlreadyExecuted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "callId",
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
    name: "CallExceededMaxGasCost",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasSpent",
        type: "uint256",
      },
    ],
    name: "ExcessiveGasSpent",
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
        name: "received",
        type: "address",
      },
    ],
    name: "FunctionIncorrectTarget",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "expected",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "received",
        type: "bytes32",
      },
    ],
    name: "FunctionMrEnclaveMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "used",
        type: "uint256",
      },
    ],
    name: "GasLimitExceeded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "expected",
        type: "address",
      },
      {
        internalType: "address",
        name: "received",
        type: "address",
      },
    ],
    name: "IncorrectFunctionId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxExpectedTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reportedTime",
        type: "uint256",
      },
    ],
    name: "IncorrectReportedTime",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "callId",
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
    name: "InsufficientCallBalance",
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
    inputs: [
      {
        internalType: "address",
        name: "callId",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "InvalidCallbackParams",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "enclaveId",
        type: "address",
      },
    ],
    name: "InvalidEnclave",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEntry",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "granter",
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
    ],
    name: "PermissionDenied",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "expectedQueueId",
        type: "address",
      },
      {
        internalType: "address",
        name: "receivedQueueId",
        type: "address",
      },
    ],
    name: "QueuesDoNotMatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
    ],
    name: "TransactionExpired",
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
        name: "callId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "code",
        type: "uint256",
      },
    ],
    name: "VerifyFailed",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "enclaveIdx",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "functionId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "observedTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nextAllowedTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "code",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "ids",
            type: "address[]",
          },
          {
            internalType: "bytes32[]",
            name: "checksums",
            type: "bytes32[]",
          },
          {
            internalType: "uint8[]",
            name: "codes",
            type: "uint8[]",
          },
        ],
        internalType: "struct FunctionVerifyLib.FunctionFailParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "failFunctionResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "enclaveIdx",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "functionId",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegatedSignerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "observedTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nextAllowedTimestamp",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "mrEnclave",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "expirationTimeSeconds",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "gasLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType: "struct TransactionLib.Transaction[]",
            name: "transactions",
            type: "tuple[]",
          },
          {
            internalType: "bytes[]",
            name: "signatures",
            type: "bytes[]",
          },
          {
            internalType: "address[]",
            name: "ids",
            type: "address[]",
          },
          {
            internalType: "bytes32[]",
            name: "checksums",
            type: "bytes32[]",
          },
          {
            internalType: "uint8[]",
            name: "codes",
            type: "uint8[]",
          },
        ],
        internalType: "struct FunctionVerifyLib.FunctionVerifyParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "verifyFunctionResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612998806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633bd7b6171461003b57806352c7cc9314610050575b600080fd5b61004e610049366004612539565b610063565b005b61004e61005e366004612689565b610459565b6003600061007d6000805160206129438339815191525490565b905060028260048111156100935761009361277f565b1180156100ad57506100ab6100a6610741565b61076e565b155b156100e4576100ba610741565b604051630754d25d60e51b81526001600160a01b0390911660048201526024015b60405180910390fd5b60048260048111156100f8576100f861277f565b148015610112575061011061010b610741565b6107f8565b155b156101435761011f610741565b6040516275103f60e11b81526001600160a01b0390911660048201526024016100db565b60018260048111156101575761015761277f565b14801561016357508015155b156101815760405163887efaa560e01b815260040160405180910390fd5b6001811415801561019157508015155b156101af5760405163887efaa560e01b815260040160405180910390fd5b6101d68260048111156101c4576101c461277f565b60008051602061294383398151915255565b60005a905060006101ea8560200151610820565b6003810154909150600090610207906001600160a01b0316610862565b905060008160010187600001518154811061022457610224612795565b60009182526020822001546001600160a01b031691506102438261088a565b6002850154909150600090610260906001600160a01b031661088a565b905061026a610741565b82546001600160a01b039081169116146102bd5781546001600160a01b0316610291610741565b60405163bf89df8360e01b81526001600160a01b039283166004820152911660248201526044016100db565b6102c9858584866108b2565b60078101546102ef57600285015460a08a01516102ef916001600160a01b03169061093d565b600781015415801590610311575061030f89602001518a60a001516109f2565b155b1561034257600781015460a08a0151604051632a96c8c760e11b8152600481019290925260248201526044016100db565b61034f8960600151610a92565b61035a898686610aea565b60048101805460ff19166002179055426005820181905561037e9062093a806127c1565b600682015560a08901516007820155600180850154601487015490916103a491906127c1565b6103ae91906127ea565b601486015542600f8601556080890151601086015560058501805460ff191660011790556000600e860181905560038501546103f89087908c905a6103f3908c6127fe565b610b7a565b6101008b015151909150156104375761041b8a61010001518b6101200151610f34565b6001830154610437908b9087906001600160a01b031684611033565b505050505050506104548160008051602061294383398151915255565b505050565b600360006104736000805160206129438339815191525490565b905060028260048111156104895761048961277f565b11801561049e575061049c6100a6610741565b155b156104ab576100ba610741565b60048260048111156104bf576104bf61277f565b1480156104d457506104d261010b610741565b155b156104e15761011f610741565b60018260048111156104f5576104f561277f565b14801561050157508015155b1561051f5760405163887efaa560e01b815260040160405180910390fd5b6001811415801561052f57508015155b1561054d5760405163887efaa560e01b815260040160405180910390fd5b6105628260048111156101c4576101c461277f565b60005a905060006105768560200151610820565b6003810154909150600090610593906001600160a01b0316610862565b90506000816001018760000151815481106105b0576105b0612795565b60009182526020822001546001600160a01b031691506105cf8261088a565b90506105d9610741565b81546001600160a01b039081169116146106005780546001600160a01b0316610291610741565b61060c848483856108b2565b6106198860400151610a92565b6009830154610100900460ff168015610656575060038401546020890151610654916001600160a01b03169061064f60016114eb565b61150b565b155b1561066c576005848101805460ff191690911790555b6002840154600090610686906001600160a01b031661088a565b60048101805460ff19166001908117909155858101546014880154929350916106ae916127c1565b6106b891906127ea565b6014860155600e85018054600191906000906106d59084906127c1565b90915550600090505a6106e890886127fe565b90506253ec6081111561071a576040516367c4251560e01b81526253ec606004820152602481018290526044016100db565b60a08a01515115610437576001830154610437908b9087906001600160a01b03168461155c565b336014361080159061075b57506001600160a01b03811630145b1561076b575060131936013560601c5b90565b6001600160a01b03811660009081527fec717508ea0d3d9f736b2da60dd18c1864c124710105fae8984f76b69eb3c825602052604081205460ff16806107f257507fec717508ea0d3d9f736b2da60dd18c1864c124710105fae8984f76b69eb3c8235b6001600160a01b0383166000908152600191909101602052604090205460ff165b92915050565b60007fec717508ea0d3d9f736b2da60dd18c1864c124710105fae8984f76b69eb3c8236107d1565b60007f72050865ba43dca306a7c9a249316457b134cf9751dcee5ef976e9d66668f8975b6001600160a01b039092166000908152602092909252506040902090565b60007f60afd68830977364a6093883acfe9f98da214c7c3590e74cf82ad9ef006ddc3e610844565b60007f0b069b3f7005cf212866feceedec3f4a425661eeb7c281e5cbcbe563cfddd098610844565b6108bd818385611b35565b6108e5576040516345f60d2760e11b81526001600160a01b03821660048201526024016100db565b600282015460038501546001600160a01b039081169116146109375760038401546002830154604051630ada499f60e21b81526001600160a01b039283166004820152911660248201526044016100db565b50505050565b6001600160a01b03821660009081527f72050865ba43dca306a7c9a249316457b134cf9751dcee5ef976e9d66668f89760209081526040808320600c0180548251818502810185019093528083529093926109cf929185918301828280156109c457602002820191906000526020600020905b8154815260200190600101908083116109b0575b505050505084611c35565b905060008112156109375750805460018101825560009182526020909120015550565b6000807f72050865ba43dca306a7c9a249316457b134cf9751dcee5ef976e9d66668f8976001600160a01b038516600090815260209182526040808220600c0180548251818602810186019093528083529094509192610a88928591830182828015610a7d57602002820191906000526020600020905b815481526020019060010190808311610a69575b505050505085611c35565b1215949350505050565b6000610aa6610aa18342612811565b611c86565b90506000610ab2611ca2565b90508082111561045457610ac681426127c1565b604051631ff8ef4960e11b81526004810191909152602481018490526044016100db565b6009810154610100900460ff168015610b22575060038201546020840151610b20916001600160a01b03169061064f60016114eb565b155b1561045457600382015460208401516001600160a01b0390911690610b4760016114eb565b60405163e65cb5d360e01b81526001600160a01b03938416600482015292909116602483015260448201526064016100db565b606060008460c001515167ffffffffffffffff811115610b9c57610b9c612114565b604051908082528060200260200182016040528015610bc5578160200160208202803683370190505b50905060007f600fcc152361d3982abba1c7da63e8ed79c28272e1cb6960e42211209375d5b490506000610bfc8760200151611cdc565b905060005b8760c0015151811015610f255760005a905060008960c001518381518110610c2b57610c2b612795565b6020026020010151905060006001600160a01b031681606001516001600160a01b031614610dfb576000610c5e82611d04565b60008181526020889052604090205490915060ff1615610c945760405163d1d36dcd60e01b8152600481018290526024016100db565b6000818152602087905260409020805460ff19166001179055508051421115610cd6578051604051636634e92360e01b815260048101919091526024016100db565b306001600160a01b031681606001516001600160a01b031603610d295760208a015160608201516040516373935eb960e11b81526001600160a01b039283166004820152911660248201526044016100db565b60008082606001516001600160a01b031683604001518460a001518e60200151604051602001610d5a92919061285c565b60408051601f1981840301815290829052610d7491612893565b60006040518083038185875af1925050503d8060008114610db1576040519150601f19603f3d011682016040523d82523d6000602084013e610db6565b606091505b5091509150610df78360600151838360405180604001604052806014815260200173119d5b98dd1a5bdb8810d85b1b0811985a5b195960621b815250611e19565b5050505b60008a60c001515189610e0e91906128af565b5a610e1990856127fe565b610e2391906127c1565b855490915015801590610e365750845481115b15610e615784546040516367c4251560e01b81526004810191909152602481018290526044016100db565b8160200151811115610e96576020820151604051631935f53160e01b81526004810191909152602481018290526044016100db565b6253ec60811115610ec6576040516367c4251560e01b81526253ec606004820152602481018290526044016100db565b60118c0181905560408201518a610edd3a846128c3565b610ee791906127c1565b610ef191906127c1565b878581518110610f0357610f03612795565b6020026020010181815250505050508080610f1d906128da565b915050610c01565b5091925050505b949350505050565b7f369c34b0cf6a0c0360099093f8ebb465df4755f0e75ec0446b0d3884a8735f3760005b835181101561093757828181518110610f7357610f73612795565b6020026020010151826000016000868481518110610f9357610f93612795565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020541461102157838181518110610fd357610fd3612795565b6020026020010151838281518110610fed57610fed612795565b60209081029190910101516040516271b3a960e61b81526001600160a01b03909216600483015260248201526044016100db565b8061102b816128da565b915050610f58565b60208401517fe08a3b4c6c3d2fd532698fd427d3f5b0497ef9035291d02cdb919e9e7e8df5ff907f275994c3f98b40ffc33e238dface8705a449977b49eb0a027dcfa35e2a5a7bb29060009061108890611cdc565b90506000805b85518110156110d0578581815181106110a9576110a9612795565b6020026020010151826110bc91906127c1565b9150806110c8816128da565b91505061108e565b50600088610100015151826110e591906128af565b905060005b896101000151518110156114df5760008a61010001515188511461110e5782611129565b87828151811061112057611120612795565b60200260200101515b905060008760000160008d6101000151858151811061114a5761114a612795565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020905085600001546000141580156111a65750818b600301543a886000015461119a91906128c3565b6111a491906127c1565b115b15611200578b610100015183815181106111c2576111c2612795565b60209081029190910101518654604051631fb0a09960e21b81526001600160a01b0390921660048301526024820152604481018390526064016100db565b60018101546001600160a01b03161561137b5760208c015181546001600160a01b03908116911614611280578b602001518c6101000151848151811061124857611248612795565b60200260200101516040516367ce657360e11b81526004016100db9291906001600160a01b0392831681529116602082015260400190565b600086600401548361129291906127c1565b905080826006015410156112f8578c610100015184815181106112b7576112b7612795565b602090810291909101015160068301546040516303dfdeeb60e51b81526001600160a01b0390921660048301526024820183905260448201526064016100db565b60088201805460ff1990811690915560048301805490911660011790554260098301556006820180548291906000906113329084906127fe565b90915550506000600583018190556040516001600160a01b038d169183156108fc02918491818181858888f19350505050158015611374573d6000803e3d6000fd5b50506114ca565b60008760000160008e6101000151868151811061139a5761139a612795565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002090508c602001516001600160a01b03168160000160009054906101000a90046001600160a01b03166001600160a01b031614611414578c602001518d6101000151858151811061124857611248612795565b600087600201548461142691906127c1565b9050808260060154101561144b578d610100015185815181106112b7576112b7612795565b6114738e6101000151868151811061146557611465612795565b602002602001015182611e95565b6040516001600160a01b038d169082156108fc029083906000818181858888f193505050501580156114a9573d6000803e3d6000fd5b505060078101805461ffff1916600117905542600482015560006005909101555b505080806114d7906128da565b9150506110ea565b50505050505050505050565b6000808260028111156115005761150061277f565b6001901b9392505050565b6001600160a01b0383811660009081527fdc662b6192622eddc6e089aea0ceba83a6d6004cf0824f8f89d137cc0bb962276020908152604080832093861683529290522054811615155b9392505050565b60088301547fe08a3b4c6c3d2fd532698fd427d3f5b0497ef9035291d02cdb919e9e7e8df5ff907f275994c3f98b40ffc33e238dface8705a449977b49eb0a027dcfa35e2a5a7bb29060005b8760a0015151811015611b2b5760005a905060008560000160008b60a0015185815181106115d8576115d8612795565b6020908102919091018101516001600160a01b03908116835290820192909252604001600020600181015490925016156118865760208a015181546001600160a01b039081169116146116405789602001518a60a00151848151811061124857611248612795565b60008a60e00151848151811061165857611658612795565b602002602001015160ff16111561168957600181600501600082825461167e91906127c1565b909155506116919050565b600060058201555b8960e0015183815181106116a7576116a7612795565b60200260200101518160080160006101000a81548160ff021916908360ff1602179055508960e0015183815181106116e1576116e1612795565b602002602001015160ff1660ca0361170357600a8101805460ff191660041790555b8960e00151838151811061171957611719612795565b602002602001015160ff168a60a00151848151811061173a5761173a612795565b60200260200101516001600160a01b03168b602001516001600160a01b03167fb32f0376bd5fdacc35fe4d9e7c5ac8a64ed2d1a9daf6ae7822cf2ca85552d2e160405160405180910390a4600089600301543a5a611798868c6127c1565b6117a291906127fe565b6117ac91906128c3565b6117b691906127c1565b9050808260060154101561182f57600a820180546004919060ff1916600183021790555060048201805460ff1916600117905560068201546040516001600160a01b038b169180156108fc02916000818181858888f19350505050158015611822573d6000803e3d6000fd5b5060006006830155611880565b8082600601600082825461184391906127fe565b90915550506040516001600160a01b038a169082156108fc029083906000818181858888f1935050505015801561187e573d6000803e3d6000fd5b505b50611b16565b60008560000160008c60a0015186815181106118a4576118a4612795565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002090508a602001516001600160a01b03168160000160009054906101000a90046001600160a01b03166001600160a01b03161461191d578a602001518b60a00151858151811061124857611248612795565b8a60e00151848151811061193357611933612795565b60200260200101518160070160016101000a81548160ff021916908360ff16021790555060008b60e00151858151811061196f5761196f612795565b602002602001015160ff1611156119a057600181600501600082825461199591906127c1565b909155506119a89050565b600060058201555b8a60e0015184815181106119be576119be612795565b602002602001015160ff1660ca036119e05760078101805460ff191660041790555b848160050154106119fb5760078101805460ff191660021790555b60008a600301543a5a611a0e878d6127c1565b611a1891906127fe565b611a2291906128c3565b611a2c91906127c1565b90508160060154811115611a41575060068101545b611a5a8c60a00151868151811061146557611465612795565b6040516001600160a01b038b169082156108fc029083906000818181858888f19350505050158015611a90573d6000803e3d6000fd5b508b60e001518581518110611aa757611aa7612795565b602002602001015160ff168c60a001518681518110611ac857611ac8612795565b60200260200101516001600160a01b03168d602001516001600160a01b03167fb32f0376bd5fdacc35fe4d9e7c5ac8a64ed2d1a9daf6ae7822cf2ca85552d2e160405160405180910390a450505b50508080611b23906128da565b9150506115a8565b5050505050505050565b60006003600484015460ff166003811115611b5257611b5261277f565b03611b5f57506001611555565b6002830154611b77906001600160a01b031685611f24565b611b8357506000611555565b4283600601541015611b9757506000611555565b611bf782600501805480602002602001604051908101604052809291908181526020018280548015611be857602002820191906000526020600020905b815481526020019060010190808311611bd4575b50505050508460070154611fe5565b611c0357506000611555565b6002600484015460ff166003811115611c1e57611c1e61277f565b14611c2b57506000611555565b5060019392505050565b6000805b8351811015611c7b5782848281518110611c5557611c55612795565b602002602001015103611c695790506107f2565b80611c73816128da565b915050611c39565b506000199392505050565b600080821215611c9e57611c99826128f3565b6107f2565b5090565b7f72050865ba43dca306a7c9a249316457b134cf9751dcee5ef976e9d66668f899546000908015611cd35780611cd6565b603c5b91505090565b60007f0503b8716b1b24014711cddf15203884982757c4ce93b16b28e1e64985c01b0a610844565b600080611d1083612038565b604080518082018252600b81526a14ddda5d18da189bd85c9960aa1b602091820152815180830183526005815264302e302e3160d81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f3534305cb0c1fabf88c04f35d35090370a9bb52f874a074b58cfeeae6de8c234818401527fae209a0b48f21c054280f2455d32cf309387644879d9acbd8ffc19916381188560608201524660808201523060a0808301919091528351808303909101815260c08201845280519083012061190160f01b60e083015260e282015261010280820194909452825180820390940184526101220190915281519101209392505050565b60608315611e8b578251600003611e84576000856001600160a01b03163b11611e845760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016100db565b5081610f2c565b610f2c83836120ea565b6001600160a01b03821660009081527f275994c3f98b40ffc33e238dface8705a449977b49eb0a027dcfa35e2a5a7bb260208190526040909120600681015483108015611ef0575082838260060154611eee91906127fe565b105b15611f055760078101805460ff191660041790555b82816006016000828254611f1991906127fe565b909155505050505050565b6001600160a01b0382811660009081527fc8b92a6aada0b6ff7b493186f8c9487f2cfcb749502b3cfd6e2f5195915c3a1a602081815260408084207fc8b92a6aada0b6ff7b493186f8c9487f2cfcb749502b3cfd6e2f5195915c3a1c8352818520878716865283528185208154909616808652959092528320929391929091611fb357600193505050506107f2565b42816001015411158015611fcc57506001820154815410155b8015611fdb5750600181015415155b9695505050505050565b6000805b835181101561202e578284828151811061200557612005612795565b60200260200101510361201c5760019150506107f2565b80612026816128da565b915050611fe9565b5060009392505050565b60007f687c97506870980d9774f5f2c2cc3fd31b851a1f28e3f222da2fb0b52c189112826000015183602001518460400151856060015186608001518760a00151805190602001206040516020016120cd97969594939291909687526020870195909552604086019390935260608501919091526001600160a01b0390811660808501521660a083015260c082015260e00190565b604051602081830303815290604052805190602001209050919050565b8151156120fa5781518083602001fd5b8060405162461bcd60e51b81526004016100db919061290f565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff8111828210171561214d5761214d612114565b60405290565b604051610160810167ffffffffffffffff8111828210171561214d5761214d612114565b604051610100810167ffffffffffffffff8111828210171561214d5761214d612114565b604051601f8201601f1916810167ffffffffffffffff811182821017156121c4576121c4612114565b604052919050565b80356001600160a01b03811681146121e357600080fd5b919050565b600067ffffffffffffffff82111561220257612202612114565b5060051b60200190565b600082601f83011261221d57600080fd5b813567ffffffffffffffff81111561223757612237612114565b61224a601f8201601f191660200161219b565b81815284602083860101111561225f57600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f83011261228d57600080fd5b813560206122a261229d836121e8565b61219b565b82815260059290921b840181019181810190868411156122c157600080fd5b8286015b8481101561237e57803567ffffffffffffffff808211156122e65760008081fd5b9088019060c0828b03601f19018113156123005760008081fd5b61230861212a565b8784013581526040808501358983015260608086013582840152608091506123318287016121cc565b9083015260a06123428682016121cc565b8383015292850135928484111561235b57600091508182fd5b6123698e8b8689010161220c565b908301525086525050509183019183016122c5565b509695505050505050565b600082601f83011261239a57600080fd5b813560206123aa61229d836121e8565b82815260059290921b840181019181810190868411156123c957600080fd5b8286015b8481101561237e57803567ffffffffffffffff8111156123ed5760008081fd5b6123fb8986838b010161220c565b8452509183019183016123cd565b600082601f83011261241a57600080fd5b8135602061242a61229d836121e8565b82815260059290921b8401810191818101908684111561244957600080fd5b8286015b8481101561237e5761245e816121cc565b835291830191830161244d565b600082601f83011261247c57600080fd5b8135602061248c61229d836121e8565b82815260059290921b840181019181810190868411156124ab57600080fd5b8286015b8481101561237e57803583529183019183016124af565b803560ff811681146121e357600080fd5b600082601f8301126124e857600080fd5b813560206124f861229d836121e8565b82815260059290921b8401810191818101908684111561251757600080fd5b8286015b8481101561237e5761252c816124c6565b835291830191830161251b565b60006020828403121561254b57600080fd5b813567ffffffffffffffff8082111561256357600080fd5b90830190610160828603121561257857600080fd5b612580612153565b82358152612590602084016121cc565b60208201526125a1604084016121cc565b6040820152606083013560608201526080830135608082015260a083013560a082015260c0830135828111156125d657600080fd5b6125e28782860161227c565b60c08301525060e0830135828111156125fa57600080fd5b61260687828601612389565b60e083015250610100808401358381111561262057600080fd5b61262c88828701612409565b828401525050610120808401358381111561264657600080fd5b6126528882870161246b565b828401525050610140808401358381111561266c57600080fd5b612678888287016124d7565b918301919091525095945050505050565b60006020828403121561269b57600080fd5b813567ffffffffffffffff808211156126b357600080fd5b9083019061010082860312156126c857600080fd5b6126d0612177565b823581526126e0602084016121cc565b60208201526040830135604082015260608301356060820152612705608084016124c6565b608082015260a08301358281111561271c57600080fd5b61272887828601612409565b60a08301525060c08301358281111561274057600080fd5b61274c8782860161246b565b60c08301525060e08301358281111561276457600080fd5b612770878286016124d7565b60e08301525095945050505050565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156107f2576107f26127ab565b634e487b7160e01b600052601260045260246000fd5b6000826127f9576127f96127d4565b500690565b818103818111156107f2576107f26127ab565b8181036000831280158383131683831282161715612831576128316127ab565b5092915050565b60005b8381101561285357818101518382015260200161283b565b50506000910152565b6000835161286e818460208801612838565b60609390931b6bffffffffffffffffffffffff19169190920190815260140192915050565b600082516128a5818460208701612838565b9190910192915050565b6000826128be576128be6127d4565b500490565b80820281158282048414176107f2576107f26127ab565b6000600182016128ec576128ec6127ab565b5060010190565b6000600160ff1b8201612908576129086127ab565b5060000390565b602081526000825180602084015261292e816040850160208701612838565b601f01601f1916919091016040019291505056fe20ced3562caba8901b8e6c0f45f2eefc88fe6f62c9647c3abea04219d18063b6a2646970667358221220b540a5fb8af1c7b1370a899c0b478920d512f4ddcf8fbb6735dfc4e94d6fbbe864736f6c63430008110033";

type FunctionVerifyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FunctionVerifyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FunctionVerify__factory extends ContractFactory {
  constructor(...args: FunctionVerifyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FunctionVerify> {
    return super.deploy(overrides || {}) as Promise<FunctionVerify>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FunctionVerify {
    return super.attach(address) as FunctionVerify;
  }
  override connect(signer: Signer): FunctionVerify__factory {
    return super.connect(signer) as FunctionVerify__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FunctionVerifyInterface {
    return new utils.Interface(_abi) as FunctionVerifyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FunctionVerify {
    return new Contract(address, _abi, signerOrProvider) as FunctionVerify;
  }
}
