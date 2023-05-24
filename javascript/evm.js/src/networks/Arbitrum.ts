import { sendTxnWithOptions } from "../sendTxnWithOptions.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  Switchboard,
  SwitchboardAttestationService,
} from "../typechain-types/index.js";
import { SendContractMethod } from "../types.js";

export class ArbitrumProgram extends SwitchboardProgram {
  constructor(
    public readonly sb: Switchboard,
    public readonly vs?: SwitchboardAttestationService
  ) {
    super(sb, vs);
  }

  sendSbTxn: SendContractMethod<Switchboard> = async (
    methodName,
    args,
    options
  ) => {
    console.info(`Overriding arbitrum program sendSbTxn impl`);
    return await sendTxnWithOptions(this.sb, methodName, args, options);
  };

  sendVsTxn: SendContractMethod<SwitchboardAttestationService> = async (
    methodName,
    args,
    options
  ) => {
    this.hasAttestationService();

    console.info(`Overriding arbitrum program sendVsTxn impl`);

    return await sendTxnWithOptions(this.vs, methodName, args, options);
  };
}
