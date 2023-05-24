import { PERMISSIONS } from "../const.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  AttestationQueueData,
  CreateFunction,
  EnablePermissions,
  RawMrEnclave,
} from "../types.js";

import { FunctionAccount } from "./FunctionAccount.js";

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

  /**
   * Create an {@linkcode FunctionAccount} and enable its serviceQueue permissions
   */
  public async createFunction(
    params: CreateFunction,
    enable: EnablePermissions = true
  ): Promise<FunctionAccount> {
    // verify it exists
    const queueData = await this.loadData();

    let authority: string | undefined = undefined;
    if (params && "authority" in params) {
      authority = params.authority;
    } else if (params && "signer" in params) {
      authority = await params.signer.getAddress();
    } else {
      authority = await this.switchboard.address;
    }
    if (!authority) {
      throw new Error(
        `You need to provide an authority or a signer to create an aggregator`
      );
    }

    const [functionAccount] = await FunctionAccount.init(
      params && "signer" in params
        ? this.switchboard.connect(params.signer)
        : this.switchboard,
      {
        ...params,
        attestationQueue: this.address,
      }
    );

    const shouldEnable =
      typeof enable === "boolean"
        ? enable
        : enable.queueAuthority !== undefined;
    if (shouldEnable) {
      const queueAuthoritySb =
        typeof enable !== "boolean" && "queueAuthority" in enable
          ? this.switchboard.connect(enable.queueAuthority).sb
          : this.switchboard.sb;
      await queueAuthoritySb.setPermission(
        this.address,
        functionAccount.address,
        PERMISSIONS.servicePermissions,
        true
      );
    }

    return functionAccount;
  }
}
