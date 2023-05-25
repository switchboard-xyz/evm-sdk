import { SBDecimal } from "../SBDecimal.js";
import {
  ISwitchboardProgram,
  OracleData,
  TransactionOptions,
} from "../types.js";

import { BigNumber, ContractTransaction } from "ethers";

/**
 * Parameters for saving the result of a query.
 *
 * @example
 * const saveResultParams: SaveResultParams = {
 *   value: someSBDecimalInstance,
 *   aggregatorAddress: "0xAggregatorAddress",
 * };
 */
export interface SaveResultParams {
  value: SBDecimal;
  aggregatorAddress: string;
}

/**
 * Parameters for an oracle to save multiple results.
 *
 * @example
 * const oracleSaveResultParams: OracleSaveResultParams = {
 *   data: [saveResultParams1, saveResultParams2],
 *   oracleIdx: 0,
 *   queueAddress: "0xQueueAddress",
 * };
 */
export interface OracleSaveResultParams {
  data: SaveResultParams[];
  oracleIdx: number;
  queueAddress: string;
}

/**
 * Initialization parameters for an oracle.
 *
 * @example
 * const oracleInitParams: OracleInitParams = {
 *   name: "OracleName",
 *   authority: "0xAuthorityAddress",
 * };
 */
export interface OracleInitParams {
  name?: string;
  authority: string;
}

/**
 * Represents an oracle account in the Switchboard network.
 *
 * @example
 * const oracle = new OracleAccount(switchboard, "0xOracleAddress");
 */
export class OracleAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Load data from the oracle.
   *
   * @example
   * const data = await oracle.loadData();
   *
   * @returns A Promise that resolves to the data of the oracle.
   */
  public async loadData(): Promise<OracleData> {
    return await this.switchboard.sb.oracles(this.address);
  }

  /**
   * Static method to load an oracle account.
   *
   * @param switchboard - An instance of the {@linkcode SwitchboardProgram}.
   * @param address - The address of the oracle.
   *
   * @example
   * const [oracleAccount, oracleData] = await OracleAccount.load(switchboard, "0xOracleAddress");
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
   * @param switchboard - An instance of the {@linkcode SwitchboardProgram}.
   * @param params - Initialization parameters for the oracle.
   * @param options - Transaction options.
   *
   * @example
   * const [oracleAccount, txReceipt] = await OracleAccount.init(switchboard, {
   *   name: "NewOracle",
   *   authority: "0xAuthorityAddress",
   *   queueAddress: "0xQueueAddress",
   * }, transactionOptions);
   *
   * @returns A Promise that resolves to an array containing the oracle account and the transaction receipt.
   */
  public static async init(
    switchboard: ISwitchboardProgram,
    params: OracleInitParams & { queueAddress: string },
    options?: TransactionOptions
  ): Promise<[OracleAccount, ContractTransaction]> {
    const tx = await switchboard.sendSbTxn(
      "createOracle",
      [params.name ?? "", params.authority, params.queueAddress],
      options
    );
    const oracleAddress = await switchboard.pollTxnForSbEvent(
      tx,
      "accountAddress"
    );
    return [new OracleAccount(switchboard, oracleAddress), tx];
  }

  /**
   * Set configuration of the oracle. (Not yet implemented)
   *
   * @param options - Transaction options.
   *
   * @example
   * // Once implemented
   * const txReceipt = await oracle.setConfig(transactionOptions);
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async setConfig(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Withdraw from the oracle's escrow. (Not yet implemented)
   *
   * @param options - Transaction options.
   *
   * @example
   * // Once implemented
   * const txReceipt = await oracle.escrowWithdraw(transactionOptions);
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async escrowWithdraw(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Send a heartbeat transaction from the oracle.
   *
   * @param options - Transaction options.
   *
   * @example
   * const txReceipt = await oracle.heartbeat(transactionOptions);
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async heartbeat(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO; Check the provider.address == oracle.authority
    const tx = await this.switchboard.sendSbTxn(
      "heartbeat",
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
   * @example
   * const txReceipt = await oracle.saveManyResults(oracleSaveResultParams, transactionOptions);
   *
   * @returns A Promise that resolves to the transaction receipt.
   */
  public async saveManyResults(
    params: OracleSaveResultParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO; Check the provider.address == oracle.authority

    const [aggregatorAddresses, values]: [string[], BigNumber[]] =
      params.data.reduce(
        ([a, v], p) => {
          a.push(p.aggregatorAddress);
          v.push(p.value.toBigNumber());
          return [a, v];
        },
        [[] as string[], [] as BigNumber[]]
      );

    const tx = await this.switchboard.sendSbTxn(
      "saveResults",
      [
        aggregatorAddresses, // aggregator addresses - mapped to values
        values, // values to save
        params.queueAddress, // queue that all the aggregators are in
        params.oracleIdx, // oracle's index in the queue
      ],
      options
    );
    return tx;
  }
}
