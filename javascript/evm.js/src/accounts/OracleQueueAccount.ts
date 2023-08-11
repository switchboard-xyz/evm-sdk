import { EthersError } from "../errors.js";
import type {
  CreateAggregator,
  CreateOracle,
  EnablePermissions,
  ISwitchboardProgram,
  OracleQueueAttestationConfig,
  OracleQueueData,
  RawMrEnclave,
  TransactionOptions,
} from "../types.js";
import { PermissionStatus } from "../types.js";
import { getAuthoritySigner, getQueueSigner } from "../utils.js";

import { AggregatorAccount } from "./AggregatorAccount.js";
import { OracleAccount } from "./OracleAccount.js";
import { Permissions } from "./Permissions.js";

import type { ContractTransaction } from "ethers";

/**
 * Initialization parameters for the OracleQueue.
 *
 * ```typescript
 * {
 *   authority: '0xMyAuthority',
 *   name: 'my queue',
 *   oracleTimeout: 3600,
 *   reward: 10000000,
 *   unpermissionedFeedsEnabled: true,
 *   maxSize: 100
 * }
 * ```
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
 *
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
 * Represents an Oracle Queue account in the Switchboard network.
 *
 * ```typescript
 * // Instantiate an OracleQueueAccount
 * const oracleQueueAccount = new OracleQueueAccount(switchboardProgram, '0xYourOracleQueueAddress');
 *
 * // Load the data
 * const queue = await oracleQueueAccount.loadData();
 * const name = queue.name;
 * ```
 */
export class OracleQueueAccount {
  /**
   * Constructor of OracleQueueAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the OracleQueueAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Loads the OracleQueues's data.
   *
   * ```typescript
   * const data = await oracleQueueAccount.loadData();
   * console.log(data);
   * ```
   *
   * @returns - The data associated with this OracleQueue account.
   */
  async loadData(): Promise<OracleQueueData> {
    return await this.switchboard.sb
      .oracleQueues(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Loads the list of oracles actively heartbeating on-chain.
   *
   * ```typescript
   * const oracles = await oracleQueueAccount.loadOracles();
   * console.log(oracles);
   * ```
   *
   * @returns - The list of oracles actively heartbeating on-chain.
   */
  async loadOracles(): Promise<string[]> {
    return await this.switchboard.sb
      .getOracles(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Load and fetch the account data
   * @param switchboard the {@link SwitchboardProgram} class
   * @param address address of the OracleQueueAccount
   *
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
   *
   * ```typescript
   * const [oracleQueueAccount, transaction] = await OracleQueueAccount.create(switchboardProgram, initParams);
   * ```
   */
  static async create(
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
    const queueAddress = await switchboard.pollTxnForSbEvent(tx, "accountId");
    return [new OracleQueueAccount(switchboard, queueAddress), tx];
  }

  /**
   * Set the configurations for the OracleQueueAccount
   *
   * ```typescript
   * const transaction = await oracleQueueAccount.setConfig(configParams);
   * ```
   */
  async setConfig(
    params: OracleQueueSetConfigsParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "setOracleQueueConfig",
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
   *
   * ```typescript
   * const oracleIndex = await oracleQueueAccount.getOracleIdx('0xOracleAddress');
   * ```
   */
  public async getOracleIdx(oracleAddress: string): Promise<number> {
    return (
      await this.switchboard.sb
        .getOracleIdx(oracleAddress)
        .catch(EthersError.handleError)
    ).toNumber();
  }

  /**
   * Get the attestation configuration of the OracleQueue
   *
   * ```typescript
   * const attestationConfig = await oracleQueueAccount.getAttestationConfig();
   * ```
   */
  public async getAttestationConfig(): Promise<OracleQueueAttestationConfig> {
    const attestationConfig = await this.switchboard.sb
      .queueAttestationConfigs(this.address)
      .catch(EthersError.handleError);
    return attestationConfig;
  }

  /**
   * Set the attestation configuration of the OracleQueue
   *
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
      "setOracleQueueAttestationConfig",
      [
        this.address,
        params.attestationQueueAddress,
        params.mrEnclaves,
        params.requireValidQuote !== undefined
          ? params.requireValidQuote
          : currentAttestationConfig.requireValidEnclave,
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
   *
   * ```typescript
   * const [oracleAccount, tx] = await oracleQueueAccount.createOracle(createOracleParams);
   * ```
   */
  public async createOracle(
    params?: CreateOracle,
    enable: EnablePermissions = true,
    options?: TransactionOptions
  ): Promise<[OracleAccount, ContractTransaction]> {
    // verify it exists
    const queueData = await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [oracleAccount, oracleInit] = await OracleAccount.create(
      switchboard,
      {
        name: params?.name ?? "",
        authority: authority,
        queueId: this.address,
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

    return [oracleAccount, oracleInit];
  }

  /**
   * Create an {@link AggregatorAccount} and enable its queueUsage permissions
   *
   * ```typescript
   * const [aggregatorAccount, tx] = await oracleQueueAccount.createAggregator(createAggregatorParams);
   * ```
   */
  public async createAggregator(
    params: CreateAggregator,
    enable: EnablePermissions = true,
    options?: TransactionOptions
  ): Promise<[AggregatorAccount, ContractTransaction]> {
    // verify it exists
    const queueData = await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [aggregatorAccount, aggregatorInit] = await AggregatorAccount.create(
      switchboard,
      {
        ...params,
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

    return [aggregatorAccount, aggregatorInit];
  }
}
