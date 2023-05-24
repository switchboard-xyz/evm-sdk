import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  FunctionData,
  ISwitchboardProgram,
  TransactionOptions,
} from "../types.js";

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
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  public async loadData(): Promise<FunctionData> {
    return await this.switchboard.vs.funcs(this.address);
  }

  /**
   * Load and fetch the account data
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[FunctionAccount, FunctionData]> {
    const functionAccount = new FunctionAccount(switchboard, address);
    const functionData = await functionAccount.loadData();
    return [functionAccount, functionData];
  }

  /**
   * Initialize a Function
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Function initialization params
   */
  public static async init(
    switchboard: ISwitchboardProgram,
    params: FunctionInitParams & { attestationQueue: string },
    options?: TransactionOptions
  ): Promise<[FunctionAccount, ContractTransaction]> {
    // load queue to make sure it exists
    const attestationQueue = new AttestationQueueAccount(
      switchboard,
      params.attestationQueue
    );
    const queueData = await attestationQueue.loadData();

    const tx = await switchboard.sendVsTxn(
      "createFunction",
      [
        params.authority,
        params.name,
        params.containerRegistry,
        params.container,
        params.schedule,
        params.version,
        attestationQueue.address,
      ],
      options
    );
    const functionAddress = await switchboard.pollTxnForVsEvent(
      tx,
      "accountAddress"
    );
    return [new FunctionAccount(switchboard, functionAddress), tx];
  }

  public async verify(options?: TransactionOptions): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowFund(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowWithdraw(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }
}
