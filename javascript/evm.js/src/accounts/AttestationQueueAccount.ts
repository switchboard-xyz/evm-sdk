import { SwitchboardProgram } from "../SwitchboardProgram.js";
import { SwitchboardAttestationService } from "../typechain-types/index.js";
import { RawMrEnclave } from "../types.js";

import { ContractTransaction } from "ethers";

export interface AttestationQueueInitParams {
  authority: string;
  maxSize: number;
  reward: number;
  quoteTimeout: number;
  maxQuoteVerificationAge: number;
  allowAuthorityOverrideAfter: number;
  requireAuthorityHeartbeatPermission: boolean;
  requireUsagePermissions: boolean;
}

export type AttestationQueueSetConfigsParams =
  Partial<AttestationQueueInitParams>;

export type AttestationQueueData = Awaited<
  ReturnType<SwitchboardAttestationService["queues"]>
>;

export class AttestationQueueAccount {
  constructor(
    readonly switchboard: SwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize an OracleQueueAccount
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params AttestationQueueAccount initialization params
   */
  public static async init(
    switchboard: SwitchboardProgram,
    params: AttestationQueueInitParams
  ): Promise<[AttestationQueueAccount, ContractTransaction]> {
    const tx = await switchboard.vs.createAttestationQueue(
      params.authority,
      params.maxSize,
      params.reward,
      params.quoteTimeout,
      params.maxQuoteVerificationAge,
      params.allowAuthorityOverrideAfter,
      params.requireAuthorityHeartbeatPermission,
      params.requireUsagePermissions
    );
    const queueAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new AttestationQueueAccount(switchboard, queueAddress), tx];
  }

  public async setConfigs(
    params: AttestationQueueSetConfigsParams
  ): Promise<ContractTransaction> {
    const queue = await this.loadData();
    return await this.switchboard.vs.setQueueConfig(
      this.address,
      params.authority ?? queue.authority,
      params.maxSize ?? queue.maxSize,
      params.reward ?? queue.reward,
      params.quoteTimeout ?? queue.quoteTimeout,
      params.maxQuoteVerificationAge ?? queue.maxQuoteVerificationAge,
      params.allowAuthorityOverrideAfter ?? queue.allowAuthorityOverrideAfter,
      params.requireAuthorityHeartbeatPermission
        ? params.requireAuthorityHeartbeatPermission
        : queue.requireAuthorityHeartbeatPermission,
      params.requireUsagePermissions
        ? params.requireUsagePermissions
        : queue.requireUsagePermissions
    );
  }

  public async loadData(): Promise<AttestationQueueData> {
    return await this.switchboard.vs.queues(this.address);
  }

  public async hasMrEnclave(mrEnclave: RawMrEnclave): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async addMrEnclave(
    mrEnclave: RawMrEnclave
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async removeMrEnclave(
    mrEnclave: RawMrEnclave
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }
}
