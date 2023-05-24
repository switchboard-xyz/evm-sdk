import { PERMISSIONS } from "../const.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  AttestationQueueData,
  CreateFunction,
  CreateQuote,
  EnablePermissions,
  RawMrEnclave,
} from "../types.js";

import { FunctionAccount } from "./FunctionAccount.js";
import { QuoteAccount } from "./QuoteAccount.js";

import { ContractTransaction, Signer } from "ethers";

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
    await this.loadData();

    const isAuthoritySigner =
      params &&
      "authority" in params &&
      typeof params.authority !== "string" &&
      Signer.isSigner(params.authority);

    let authority: string | undefined = undefined;
    if (params && "authority" in params) {
      if (typeof params.authority === "string") {
        authority = params.authority;
      } else if (Signer.isSigner(params.authority)) {
        authority = await (params.authority as Signer).getAddress();
      }
    } else {
      authority = await this.switchboard.address;
    }
    if (!authority) {
      throw new Error(
        `You need to provide an 'authority' as a string or a signer to create a function`
      );
    }

    const switchboard = isAuthoritySigner
      ? this.switchboard.connect(params.authority as Signer)
      : this.switchboard;

    const [functionAccount] = await FunctionAccount.init(switchboard, {
      ...params,
      attestationQueue: this.address,
    });

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

  /**
   * Create an {@linkcode QuoteAccount} and enable its serviceQueue permissions
   */
  public async createQuote(params: CreateQuote): Promise<QuoteAccount> {
    // verify it exists
    await this.loadData();

    const isAuthoritySigner =
      params &&
      "authority" in params &&
      typeof params.authority !== "string" &&
      Signer.isSigner(params.authority);

    let authority: string | undefined = undefined;
    if (params && "authority" in params) {
      if (typeof params.authority === "string") {
        authority = params.authority;
      } else if (Signer.isSigner(params.authority)) {
        authority = await (params.authority as Signer).getAddress();
      }
    } else {
      authority = await this.switchboard.address;
    }
    if (!authority) {
      throw new Error(
        `You need to provide an 'authority' as a string or a signer to create a quote`
      );
    }

    const switchboard = isAuthoritySigner
      ? this.switchboard.connect(params.authority as Signer)
      : this.switchboard;

    const [quoteAccount] = await QuoteAccount.init(switchboard, {
      ...params,
      attestationQueue: this.address,
    });

    return quoteAccount;
  }
}
