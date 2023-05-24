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
import { getAuthoritySigner, getQueueSigner } from "../utils.js";

import { FunctionAccount } from "./FunctionAccount.js";
import { Permissions } from "./Permissions.js";
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

  public async loadData(): Promise<AttestationQueueData> {
    return await this.switchboard.vs.queues(this.address);
  }

  /**
   * Load and fetch the account data
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[AttestationQueueAccount, AttestationQueueData]> {
    const attestationQueueAccount = new AttestationQueueAccount(
      switchboard,
      address
    );
    const attestationQueue = await attestationQueueAccount.loadData();
    return [attestationQueueAccount, attestationQueue];
  }

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
    const queueAddress = await switchboard.pollTxnForVsEvent(
      tx,
      "accountAddress"
    );
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
      const setPermTx = await Permissions.set(
        this.switchboard,
        this,
        functionAccount.address,
        PermissionStatus.PERMIT_ATTESTATION_QUEUE_USAGE,
        true,
        {
          ...options,
          signer: getQueueSigner(enable),
        }
      );

      await setPermTx.wait();
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
