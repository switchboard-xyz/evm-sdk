import { sendTxnWithOptions } from "../sendTxnWithOptions.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import { Switchboard } from "../typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/index.js";
import { SendContractMethod } from "../types.js";

export class ArbitrumProgram extends SwitchboardProgram {
  constructor(public readonly sb: Switchboard) {
    super(sb);
  }

  sendSbTxn: SendContractMethod<Switchboard> = async (
    methodName,
    args,
    options
  ) => {
    console.info(`Overriding arbitrum program sendSbTxn impl`);
    return await sendTxnWithOptions(this.sb, methodName, args, options);
  };
}
