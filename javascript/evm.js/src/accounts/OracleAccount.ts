import { EthersError } from "../errors.js";
import type {
  ISwitchboardProgram,
  OracleData,
  TransactionOptions,
} from "../types.js";
import { toBigNumber } from "../utils.js";

import type { Big } from "@switchboard-xyz/common";
import type { BigNumber, ContractTransaction } from "ethers";

/**
 * Parameters for saving the result of a query.
 *
 * ```typescript
 * const saveResultParams: SaveResultParams = {
 *   value: someSBDecimalInstance,
 *   aggregatorAddress: "0xAggregatorAddress",
 * };
 * ```
 */
export interface SaveResultParams {
  value: Big;
  aggregatorAddress: string;
}

/**
 * Parameters for an oracle to save multiple results.
 *
 * ```typescript
 * const oracleSaveResultParams: OracleSaveResultParams = {
 *   data: [saveResultParams1, saveResultParams2],
 *   oracleIdx: 0,
 *   queueId: "0xQueueId",
 * };
 * ```
 */
export interface OracleSaveManyResultParams {
  data: SaveResultParams[];
  oracleIdx?: number;
  queueId: string;
}

/**
 * Initialization parameters for an oracle.
 *
 * ```typescript
 * const oracleInitParams: OracleInitParams = {
 *   name: "OracleName",
 *   authority: "0xAuthorityId",
 * };
 * ```
 */
export interface OracleInitParams {
  name?: string;
  authority: string;
  owner?: string;
}

/**
 * Represents an Oracle Account in the Switchboard.sol contract.
 *
 * ```typescript
 * // Instantiate an OracleAccount
 * const oracleAccount = new OracleAccount(switchboardProgram, '0xYourOracleId');
 *
 * // Load the data
 * const oracle = await oracleAccount.loadData();
 * const name = oracle.name;
 * ```
 */
export class OracleAccount {
  /**
   * Constructor of OracleQueueAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the OracleAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Load data from the oracle.
   *
   * ```typescript
   * const data = await oracle.loadData();
   * ```
   *
   * @returns A Promise that resolves to the data of the oracle.
   */
  public async loadData(): Promise<OracleData> {
    return await this.switchboard.sb
      .oracles(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Static method to load an oracle account.
   *
   * @param switchboard - An instance of the {@link SwitchboardProgram}.
   * @param address - The address of the oracle.
   *
   * ```typescript
   * const [oracleAccount, oracleData] = await OracleAccount.load(switchboard, "0xOracleAddress");
   * ```
   *
   * @returns A Promise that resolves to an array containing the oracle account and its data.
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[OracleAccount, OracleData]> {
    const oracleAccount = new OracleAccount(switchboard, address);
    const oracle = await oracleAccount.loadData();
    return [oracleAccount, oracle];
  }

  /**
   * Initialize an oracle.
   *
   * @param switchboard - An instance of the {@link SwitchboardProgram}.
   * @param params - Initialization parameters for the oracle.
   * @param options - Transaction options.
   *
   * ```typescript
   * const [oracleAccount, txReceipt] = await OracleAccount.create(switchboard, {
   *   name: "NewOracle",
   *   authority: "0xAuthorityAddress",
   *   queueId: "0xQueueAddress",
   * }, transactionOptions);
   * ```
   *
   * @returns A Promise that resolves to an array containing the oracle account and the transaction receipt.
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: OracleInitParams & { queueId: string },
    options?: TransactionOptions
  ): Promise<[OracleAccount, ContractTransaction]> {
    const tx = await switchboard.sendSbTxn(
      "createOracle",
      [
        params.name ?? "",
        params.authority,
        params.queueId,
        params.owner ?? params.authority,
      ],
      options
    );
    const oracleId = await switchboard.pollTxnForSbEvent(tx, "accountId");
    return [new OracleAccount(switchboard, oracleId), tx];
  }

  /**
   * Set configuration of the oracle. (Not yet implemented)
   *
   * @param params - The new oracle config.
   * @param options - Transaction options.
   *
   * ```typescript
   * // Once implemented
   * const txReceipt = await oracle.setConfig(transactionOptions);
   * ```
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async setConfig(
    params: Partial<OracleInitParams>,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const oracle = await this.loadData();
    const tx = await this.switchboard.sendSbTxn(
      "setOracleConfig",
      [
        this.address,
        params.name ?? oracle.name,
        params.authority ?? oracle.authority,
        oracle.queueId,
        params.owner ?? params.authority,
      ],
      options
    );
    return tx;
  }

  /**
   * Get the index of the oracle in the queue
   *
   * ```typescript
   * const oracleIndex = await oracleAccount.getIdx();
   * ```
   */
  public async getIdx(): Promise<number> {
    return (
      await this.switchboard.sb
        .getOracleIdx(this.address)
        .catch(EthersError.handleError)
    ).toNumber();
  }

  /**
   * Send a heartbeat transaction from the oracle.
   *
   * @param options - Transaction options.
   *
   * ```typescript
   * const txReceipt = await oracle.heartbeat(transactionOptions);
   * ```
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async heartbeat(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO; Check the provider.address == oracle.authority
    const tx = await this.switchboard.sendSbTxn(
      "oracleHeartbeat",
      [this.address],
      options
    );
    return tx;
  }

  /**
   * Oracle Bulk Save Results Action
   *
   * @param params - Parameters for saving multiple results.
   * @param options - Transaction options.
   *
   * ```typescript
   * const txReceipt = await oracle.saveManyResults(oracleSaveResultParams, transactionOptions);
   * ```
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async saveManyResults(
    params: OracleSaveManyResultParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO: Check the provider.address == oracle.authority

    const aggregatorIds: string[] = []; // aggregator addresses - mapped to values
    const values: BigNumber[] = []; // values to save

    for (const row of params.data) {
      aggregatorIds.push(row.aggregatorAddress);

      const value = toBigNumber(row.value);
      values.push(value);
    }

    // oracle's index in the queue
    const oracleIdx = params.oracleIdx ?? (await this.getIdx());

    const tx = await this.switchboard.sendSbTxn(
      "saveResults",
      [
        aggregatorIds,
        values,
        params.queueId, // queue that all the aggregators are in
        oracleIdx,
      ],
      options
    );
    return tx;
  }
}
