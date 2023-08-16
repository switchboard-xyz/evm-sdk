import { sendTxnWithOptions } from "../sendTxnWithOptions.js";
import type { Switchboard } from "../switchboard-types/hardhat-diamond-abi/HardhatDiamondABI.sol";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import type { SendContractMethod } from "../types.js";

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
