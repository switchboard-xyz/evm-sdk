import {
  CreateAggregator,
  CreateOracle,
  EnablePermissions,
  ISwitchboardProgram,
  OracleQueueAttestationConfig,
  OracleQueueData,
  PermissionStatus,
  RawMrEnclave,
  TransactionOptions,
} from "../types.js";
import { getAuthoritySigner, getQueueSigner } from "../utils.js";

import { AggregatorAccount } from "./AggregatorAccount.js";
import { OracleAccount } from "./OracleAccount.js";
import { Permissions } from "./Permissions.js";

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
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  async loadData(): Promise<OracleQueueData> {
    return await this.switchboard.sb.queues(this.address);
  }

  /**
   * Load and fetch the account data
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[OracleQueueAccount, OracleQueueData]> {
    const oracleQueueAccount = new OracleQueueAccount(switchboard, address);
    const queue = await oracleQueueAccount.loadData();
    return [oracleQueueAccount, queue];
  }

  /**
   * Initialize an OracleQueueAccount
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params OracleQueueAccount initialization params
   */
  static async init(
    switchboard: ISwitchboardProgram,
    params: OracleQueueInitParams,
    options?: TransactionOptions
  ): Promise<[OracleQueueAccount, ContractTransaction]> {
    const tx = await switchboard.sendSbTxn(
      "createOracleQueue",
      [
        params.name,
        params.authority,
        params.unpermissionedFeedsEnabled,
        params.maxSize,
        params.reward,
        params.oracleTimeout,
      ],
      options
    );
    const queueAddress = await switchboard.pollTxnForSbEvent(
      tx,
      "accountAddress"
    );
    return [new OracleQueueAccount(switchboard, queueAddress), tx];
  }

  async setConfig(
    params: OracleQueueSetConfigsParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "setQueueConfig",
      [
        this.address,
        params.name,
        params.authority,
        params.unpermissionedFeedsEnabled,
        params.maxSize,
        params.reward,
        params.oracleTimeout,
      ],
      options
    );
    return tx;
  }

  public async getOracleIdx(oracleAddress: string): Promise<number> {
    return (await this.switchboard.sb.getOracleIdx(oracleAddress)).toNumber();
  }

  public async getAttestationConfig(): Promise<OracleQueueAttestationConfig> {
    const attestationConfig = await this.switchboard.sb.queueAttestationConfigs(
      this.address
    );
    return attestationConfig;
  }

  public async setAttestationConfig(
    params: {
      attestationQueueAddress: string;
      mrEnclaves?: Array<RawMrEnclave>;
      requireValidQuote?: boolean;
      requireHeartbeatPermission?: boolean;
    },
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const currentAttestationConfig = await this.getAttestationConfig();
    const tx = await this.switchboard.sendSbTxn(
      "setQueueAttestationConfig",
      [
        this.address,
        params.attestationQueueAddress,
        params.mrEnclaves,
        params.requireValidQuote !== undefined
          ? params.requireValidQuote
          : currentAttestationConfig.requireValidQuote,
        params.requireHeartbeatPermission !== undefined
          ? params.requireHeartbeatPermission
          : currentAttestationConfig.requireHeartbeatPermission,
      ],
      options
    );
    return tx;
  }

  /**
   * Create an {@linkcode OracleAccount} and enable its heartbeat permissions
   */
  public async createOracle(
    params?: CreateOracle,
    enable: EnablePermissions = true,
    options?: TransactionOptions
  ): Promise<OracleAccount> {
    // verify it exists
    const queueData = await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [oracleAccount] = await OracleAccount.init(
      switchboard,
      {
        name: params?.name ?? "",
        authority: authority,
        queueAddress: this.address,
      },
      {
        ...options,
        signer: authoritySigner,
      }
    );

    if (
      typeof enable === "boolean" ? enable : enable.queueAuthority !== undefined
    ) {
      const setPermTx = await Permissions.set(
        this.switchboard,
        this,
        oracleAccount.address,
        PermissionStatus.PERMIT_ORACLE_HEARTBEAT,
        true,
        {
          ...options,
          signer: getQueueSigner(enable),
        }
      );
      await setPermTx.wait();
    }

    return oracleAccount;
  }

  /**
   * Create an {@linkcode AggregatorAccount} and enable its queueUsage permissions
   */
  public async createAggregator(
    params: CreateAggregator,
    enable: EnablePermissions = true,
    options?: TransactionOptions
  ): Promise<AggregatorAccount> {
    // verify it exists
    const queueData = await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [aggregatorAccount] = await AggregatorAccount.init(
      switchboard,
      {
        ...params,
        authority: authority,
        queueAddress: this.address,
        initialValue: BigNumber.from(0),
      },
      {
        ...options,
        signer: authoritySigner,
      }
    );

    if (
      typeof enable === "boolean" ? enable : enable.queueAuthority !== undefined
    ) {
      const setPermTx = await Permissions.set(
        this.switchboard,
        this,
        aggregatorAccount.address,
        PermissionStatus.PERMIT_ORACLE_QUEUE_USAGE,
        true,
        {
          ...options,
          signer: getQueueSigner(enable),
        }
      );

      await setPermTx.wait();
    }

    return aggregatorAccount;
  }
}
