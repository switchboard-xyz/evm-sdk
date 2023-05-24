import { SwitchboardProgram } from "../SwitchboardProgram.js";
import { SwitchboardAttestationService } from "../typechain-types/index.js";
import { FunctionData } from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { ContractTransaction } from "ethers";

export interface FunctionInitParams {
  authority: string;
  name: string;
  containerRegistry: string;
  container: string;
  schedule: string;
  version: string;
}

export class FunctionAccount {
  constructor(
    readonly switchboard: SwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize a Function
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Function initialization params
   */
  public static async init(
    switchboard: SwitchboardProgram,
    params: FunctionInitParams & { attestationQueue: string }
  ): Promise<[FunctionAccount, ContractTransaction]> {
    // load queue to make sure it exists
    const attestationQueue = new AttestationQueueAccount(
      switchboard,
      params.attestationQueue
    );
    const queueData = await attestationQueue.loadData();

    const tx = await switchboard.vs.createFunction(
      params.authority,
      params.name,
      params.containerRegistry,
      params.container,
      params.schedule,
      params.version,
      attestationQueue.address
    );

    const functionAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new FunctionAccount(switchboard, functionAddress), tx];
  }

  public async loadData(): Promise<FunctionData> {
    return await this.switchboard.vs.funcs(this.address);
  }

  public async verify(): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowFund(): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowWithdraw(): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }
}
