import { SwitchboardProgram } from "../SwitchboardProgram.js";
import { Switchboard } from "../typechain-types/index.js";

import { ContractTransaction } from "ethers";

export interface OracleQueueInitParams {
  authority: string;
  name: string;
  oracleTimeout: number;
  reward: number;
  unpermissionedFeedsEnabled: boolean;
  maxSize: number;
}

export interface OracleQueueSetConfigsParams {
  name: string;
  authority: string;
  oracleTimeout: number;
  reward: number;
  maxSize: number;
  unpermissionedFeedsEnabled: boolean;
}

export type OracleQueueData = Awaited<ReturnType<Switchboard["queues"]>>;

export class OracleQueueAccount {
  constructor(
    readonly switchboard: SwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize an OracleQueueAccount
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params OracleQueueAccount initialization params
   */
  static async init(
    switchboard: SwitchboardProgram,
    params: OracleQueueInitParams
  ): Promise<[OracleQueueAccount, ContractTransaction]> {
    const tx = await switchboard.sb.createOracleQueue(
      params.name,
      params.authority,
      params.unpermissionedFeedsEnabled,
      params.maxSize,
      params.reward,
      params.oracleTimeout
    );
    const queueAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new OracleQueueAccount(switchboard, queueAddress), tx];
  }

  async setConfig(
    params: OracleQueueSetConfigsParams
  ): Promise<ContractTransaction> {
    return await this.switchboard.sb.setQueueConfig(
      this.address,
      params.name,
      params.authority,
      params.unpermissionedFeedsEnabled,
      params.maxSize,
      params.reward,
      params.oracleTimeout
    );
  }

  async loadData(): Promise<OracleQueueData> {
    return await this.switchboard.sb.queues(this.address);
  }

  public async getOracleIdx(oracleAddress: string): Promise<number> {
    throw new Error(`Not implemented yet`);
  }
}
