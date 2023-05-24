import {
  AttestationQueueData,
  CreateFunction,
  CreateQuote,
  EnablePermissions,
  ISwitchboardProgram,
  PermissionStatus,
  RawMrEnclave,
  TransactionOptions,
} from "../types.js";
import { getAuthoritySigner } from "../utils.js";

import { FunctionAccount } from "./FunctionAccount.js";
import { QuoteAccount } from "./QuoteAccount.js";

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
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize an OracleQueueAccount
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params AttestationQueueAccount initialization params
   */
  public static async init(
    switchboard: ISwitchboardProgram,
    params: AttestationQueueInitParams,
    options?: TransactionOptions
  ): Promise<[AttestationQueueAccount, ContractTransaction]> {
    const tx = await switchboard.sendVsTxn(
      "createAttestationQueue",
      [
        params.authority,
        params.maxSize,
        params.reward,
        params.quoteTimeout,
        params.maxQuoteVerificationAge,
        params.allowAuthorityOverrideAfter,
        params.requireAuthorityHeartbeatPermission,
        params.requireUsagePermissions,
      ],
      options
    );
    const queueAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new AttestationQueueAccount(switchboard, queueAddress), tx];
  }

  public async setConfigs(
    params: AttestationQueueSetConfigsParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const queue = await this.loadData();
    const tx = await this.switchboard.sendVsTxn(
      "setQueueConfig",
      [
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
          : queue.requireUsagePermissions,
      ],
      options
    );
    return tx;
  }

  public async loadData(): Promise<AttestationQueueData> {
    return await this.switchboard.vs.queues(this.address);
  }

  public async hasMrEnclave(mrEnclave: RawMrEnclave): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async addMrEnclave(
    mrEnclave: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async removeMrEnclave(
    mrEnclave: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Create an {@linkcode FunctionAccount} and enable its serviceQueue permissions
   */
  public async createFunction(
    params: CreateFunction,
    enable: EnablePermissions = true,
    options?: TransactionOptions
  ): Promise<FunctionAccount> {
    // verify it exists
    await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [functionAccount] = await FunctionAccount.init(
      switchboard,
      {
        ...params,
        authority: authority,
        attestationQueue: this.address,
      },
      { ...options, signer: authoritySigner }
    );

    if (
      typeof enable === "boolean" ? enable : enable.queueAuthority !== undefined
    ) {
      const queueAuthoritySb =
        typeof enable !== "boolean" && "queueAuthority" in enable
          ? this.switchboard.connect(enable.queueAuthority).sb
          : this.switchboard.sb;
      await queueAuthoritySb.setPermission(
        this.address,
        functionAccount.address,
        PermissionStatus.PERMIT_ATTESTATION_QUEUE_USAGE,
        true
      );
    }

    return functionAccount;
  }

  /**
   * Create an {@linkcode QuoteAccount} and enable its serviceQueue permissions
   */
  public async createQuote(
    params: CreateQuote,
    options?: TransactionOptions
  ): Promise<QuoteAccount> {
    // verify it exists
    await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [quoteAccount] = await QuoteAccount.init(
      switchboard,
      {
        ...params,
        authority: authority,
        attestationQueue: this.address,
      },
      { ...options, signer: authoritySigner }
    );

    return quoteAccount;
  }
}
