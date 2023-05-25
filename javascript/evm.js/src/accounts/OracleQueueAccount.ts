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

/**
 * Initialization parameters for the OracleQueue.
 */
export interface OracleQueueInitParams {
  authority: string;
  name: string;
  oracleTimeout: number;
  reward: number;
  unpermissionedFeedsEnabled: boolean;
  maxSize: number;
}

/**
 * An account class for an OracleQueue in the {@link Switchboard} contract.
 *
 * @example
 * ```typescript
 * const oracleQueueAccount = new OracleQueueAccount(switchboardProgram, '0xYourAccountAddress');
 * ```
 */
export interface OracleQueueSetConfigsParams {
  name: string;
  authority: string;
  oracleTimeout: number;
  reward: number;
  maxSize: number;
  unpermissionedFeedsEnabled: boolean;
}

/**
 * OracleQueue contract represents an account of OracleQueue in the Switchboard network.
 */
export class OracleQueueAccount {
  /**
   * Constructor of OracleQueueAccount
   * @param switchboard the instance of Switchboard contract
   * @param address address of the OracleQueueAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  async loadData(): Promise<OracleQueueData> {
    return await this.switchboard.sb.queues(this.address);
  }

  /**
   * Load and fetch the account data
   * @param switchboard the {@link SwitchboardProgram} class
   * @param address address of the OracleQueueAccount
   * @example
   * ```typescript
   * const [oracleQueueAccount, oracleQueueData] = await OracleQueueAccount.load(switchboardProgram, '0xYourAccountAddress');
   * ```
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
   * @param switchboard the {@link SwitchboardProgram} class
   * @param params OracleQueueAccount initialization params
   * @example
   * ```typescript
   * const [oracleQueueAccount, transaction] = await OracleQueueAccount.init(switchboardProgram, initParams);
   * ```
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

  /**
   * Set the configurations for the OracleQueueAccount
   * @example
   * ```typescript
   * const transaction = await oracleQueueAccount.setConfig(configParams);
   * ```
   */
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

  /**
   * Get the index of the oracle in the queue
   * @example
   * ```typescript
   * const oracleIndex = await oracleQueueAccount.getOracleIdx('0xOracleAddress');
   * ```
   */
  public async getOracleIdx(oracleAddress: string): Promise<number> {
    return (await this.switchboard.sb.getOracleIdx(oracleAddress)).toNumber();
  }

  /**
   * Get the attestation configuration of the OracleQueue
   * @example
   * ```typescript
   * const attestationConfig = await oracleQueueAccount.getAttestationConfig();
   * ```
   */
  public async getAttestationConfig(): Promise<OracleQueueAttestationConfig> {
    const attestationConfig = await this.switchboard.sb.queueAttestationConfigs(
      this.address
    );
    return attestationConfig;
  }

  /**
   * Set the attestation configuration of the OracleQueue
   * @example
   * ```typescript
   * const transaction = await oracleQueueAccount.setAttestationConfig(attestationConfigParams);
   * ```
   */
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
   * Create an {@link OracleAccount} and enable its heartbeat permissions
   * @example
   * ```typescript
   * const oracleAccount = await oracleQueueAccount.createOracle(createOracleParams);
   * ```
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
   * Create an {@link AggregatorAccount} and enable its queueUsage permissions
   * @example
   * ```typescript
   * const aggregatorAccount = await oracleQueueAccount.createAggregator(createAggregatorParams);
   * ```
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
