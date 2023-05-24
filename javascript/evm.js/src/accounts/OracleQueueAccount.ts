import { PERMISSIONS } from "../const.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  CreateAggregator,
  CreateOracle,
  EnablePermissions,
  OracleQueueData,
} from "../types.js";

import { AggregatorAccount } from "./AggregatorAccount.js";
import { OracleAccount } from "./OracleAccount.js";

import { BigNumber, ContractTransaction } from "ethers";

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

  /**
   * Create an {@linkcode OracleAccount} and enable its heartbeat permissions
   */
  public async createOracle(
    params?: CreateOracle,
    enable: EnablePermissions = true
  ): Promise<OracleAccount> {
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
        `You need to provide an authority or a signer to create an oracle`
      );
    }
    const [oracleAccount] = await OracleAccount.init(
      params && "signer" in params
        ? this.switchboard.connect(params.signer)
        : this.switchboard,
      {
        name: params?.name ?? "",
        authority: authority,
        queueAddress: this.address,
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
        oracleAccount.address,
        PERMISSIONS.heartbeatPermissions,
        true
      );
    }

    return oracleAccount;
  }

  /**
   * Create an {@linkcode AggregatorAccount} and enable its queueUsage permissions
   */
  public async createAggregator(
    params: CreateAggregator,
    enable: EnablePermissions = true
  ): Promise<AggregatorAccount> {
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

    const [aggregatorAccount] = await AggregatorAccount.init(
      params && "signer" in params
        ? this.switchboard.connect(params.signer)
        : this.switchboard,
      {
        ...params,
        authority: authority,
        queueAddress: this.address,
        initialValue: BigNumber.from(0),
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
        aggregatorAccount.address,
        PERMISSIONS.usagePermissions,
        true
      );
    }

    return aggregatorAccount;
  }
}
