import { fetchJobsFromIPFS } from "../ipfs.js";
import {
  AggregatorData,
  EventCallback,
  ISwitchboardProgram,
  Job,
  TransactionOptions,
} from "../types.js";

import { OracleQueueAccount } from "./OracleQueueAccount.js";

import { OracleJob } from "@switchboard-xyz/common";
import { BigNumber, ContractTransaction } from "ethers";

/**
 * Initialization parameters for the Aggregator.
 */
export interface AggregatorInitParams {
  authority: string; // owner of aggregator
  name: string;
  queueAddress: string;
  batchSize: number;
  minOracleResults: number;
  minJobResults: number;
  minUpdateDelaySeconds: number;
  varianceThreshold: number;
  forceReportPeriod: number;
  jobsHash: string;
  enableLegacyAdapter: boolean;
}

/**
 * Parameters to set configurations for the Aggregator.
 */
export type AggregatorSetConfigParams = Partial<AggregatorInitParams> & {
  varianceThreshold: number;
};

/**
 * Parameters to set read configurations for the Aggregator.
 */
export interface AggregatorSetReadConfigParams {
  readCharge?: number;
  rewardEscrow?: string;
  readWhitelist?: string[];
  limitReadsToWhitelist?: boolean;
  enableLegacyAdapter?: boolean;
}

/**
 * An account class for Aggregator.
 * @example
 * ```typescript
 * const aggregatorAccount = new AggregatorAccount(switchboardProgram, '0xYourAccountAddress');
 * ```
 */
export class AggregatorAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Loads the Aggregator's data.
   *
   * @example
   * ```typescript
   * const data = await aggregatorAccount.loadData();
   * console.log(data);
   * ```
   *
   * @returns - The data associated with this Aggregator account.
   */
  public async loadData(): Promise<AggregatorData> {
    return await this.switchboard.sb.aggregators(this.address);
  }

  /**
   * Load and fetch the account data
   * @param switchboard - The SwitchboardProgram class
   * @param address - The address of the Aggregator account
   * @returns A promise that resolves to the Aggregator account and data
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[AggregatorAccount, AggregatorData]> {
    const aggregatorAccount = new AggregatorAccount(switchboard, address);
    const aggregator = await aggregatorAccount.loadData();
    return [aggregatorAccount, aggregator];
  }

  public async loadJobs(): Promise<Array<OracleJob>> {
    const { jobsHash } = await this.switchboard.sb.aggregators(this.address);

    try {
      const res = await fetchJobsFromIPFS(jobsHash);
      return res.map((job: Job) => {
        return OracleJob.decodeDelimited(Buffer.from(job.data, "base64"));
      });
    } catch (e) {
      console.log(e, "\nerror fetching jobs for ipfs hash:", jobsHash);
    }
  }

  /**
   * Initializes a new AggregatorAccount.
   *
   * @param switchboard - An instance of the {@linkcode SwitchboardProgram}.
   * @param params - The initialization parameters for this Aggregator.
   * @param options - (Optional) Transaction options.
   *
   * @example
   * ```typescript
   * const initParams: AggregatorInitParams = {...};
   * const [aggregatorAccount, tx] = await AggregatorAccount.init(switchboardProgram, initParams);
   * ```
   *
   * @returns - A new AggregatorAccount instance and the ContractTransaction.
   */
  public static async init(
    switchboard: ISwitchboardProgram,
    params: AggregatorInitParams & { initialValue: BigNumber },
    options?: TransactionOptions
  ): Promise<[AggregatorAccount, ContractTransaction]> {
    // load queue to make sure it exists
    const oracleQueue = new OracleQueueAccount(
      switchboard,
      params.queueAddress
    );
    const queueData = await oracleQueue.loadData();

    const tx = await switchboard.sendSbTxn(
      "createAggregator",
      [
        params.name,
        params.authority,
        params.batchSize,
        params.minUpdateDelaySeconds,
        params.minOracleResults,
        params.jobsHash, // I recommend using https://web3.storage/ for hosting jobs - it's free + fast!
        params.queueAddress,
        Math.trunc(params.varianceThreshold * 10 ** 18),
        params.minJobResults,
        params.forceReportPeriod,
        params.enableLegacyAdapter, // AggregatorV3 Interface Support (2x's gas cost)
        {
          value: params.initialValue ?? 0,
        },
      ],
      options
    );
    const aggregatorAddress = await switchboard.pollTxnForSbEvent(
      tx,
      "accountAddress"
    );
    return [new AggregatorAccount(switchboard, aggregatorAddress), tx];
  }

  /**
   * Gets the latest value from the Aggregator account.
   *
   * @example
   * ```typescript
   * const latestValue = await aggregatorAccount.latestValue();
   * console.log(latestValue);
   * ```
   *
   * @returns - The latest value stored in the aggregator on-chain.
   */
  public async latestValue(): Promise<number> {
    return (
      await this.switchboard.sb.aggregators(this.address)
    ).latestResult.value.toNumber();
  }

  /**
   * Sets the configuration for the Aggregator account.
   *
   * @param params - The new configuration parameters.
   * @param options - (Optional) Transaction options.
   *
   * @example
   * ```typescript
   * const configParams: AggregatorSetConfigParams = {...};
   * const tx = await aggregatorAccount.setConfig(configParams);
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async setConfig(
    params: AggregatorSetConfigParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const aggregator = await this.loadData();

    const oracleQueue = new OracleQueueAccount(
      this.switchboard,
      params.queueAddress ?? aggregator.queueAddress
    );
    const queueData = await oracleQueue.loadData();

    const tx = await this.switchboard.sendSbTxn(
      "setAggregatorConfig",
      [
        this.address,
        params.name ?? aggregator.name,
        params.authority ?? aggregator.authority,
        params.batchSize ?? aggregator.batchSize,
        params.minUpdateDelaySeconds ?? aggregator.minUpdateDelaySeconds,
        params.minOracleResults ?? aggregator.minOracleResults,
        params.jobsHash ?? aggregator.jobsHash,
        oracleQueue.address,
        Math.trunc(params.varianceThreshold * 10 ** 18),
        params.minJobResults,
        params.forceReportPeriod,
      ],
      options
    );

    return tx;
  }

  /**
   * Sets the read configuration for the Aggregator account.
   *
   * @param params - The new read configuration parameters.
   * @param options - (Optional) Transaction options.
   *
   * @example
   * ```typescript
   * const readConfigParams: AggregatorSetReadConfigParams = {...};
   * const tx = await aggregatorAccount.setReadConfig(readConfigParams);
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async setReadConfig(
    params: AggregatorSetReadConfigParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "setAggregatorReadConfig",
      [
        this.address,
        params.readCharge,
        params.rewardEscrow,
        params.readWhitelist,
        params.limitReadsToWhitelist,
        params.enableLegacyAdapter,
      ],
      options
    );

    return tx;
  }

  /**
   * Watches the Aggregator account for changes.
   *
   * @param switchboard - An instance of the Switchboard program.
   * @param address - The address of the Aggregator account to watch.
   * @param callback - The callback function to call when an event occurs.
   *
   * @example
   * ```typescript
   * const watchHandle = AggregatorAccount.watch(switchboardProgram, 'account_address', (event) => {
   *   console.log(event);
   * });
   * // To stop watching
   * watchHandle.stop();
   * ```
   *
   * @returns - An object with a `stop` method to stop watching the account.
   */
  public static watch(
    switchboard: ISwitchboardProgram,
    address: string,
    callback: EventCallback
  ): { stop: () => void } {
    const sb = switchboard.sb.on(
      switchboard.sb.filters.AggregatorUpdate(address),
      callback
    );
    return {
      stop: () => {
        sb.removeListener(
          switchboard.sb.filters.AggregatorUpdate(address),
          callback
        );
      },
    };
  }

  /**
   * Escrow funds for the Aggregator account.
   *
   * @param options - (Optional) Transaction options.
   *
   * @example
   * ```typescript
   * const tx = await aggregatorAccount.escrowFund();
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowFund(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Withdraw funds from the Aggregator account's escrow.
   *
   * @param options - (Optional) Transaction options.
   *
   * @example
   * ```typescript
   * const tx = await aggregatorAccount.escrowWithdraw();
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowWithdraw(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Get the latest result from an aggregator to access historical data
   *
   * @example
   * ```typescript
   * const intervalId = await aggregatorAccount.getCurrentIntervalId();
   * console.log(intervalId);
   * ```
   *
   * @returns - The current interval ID.
   */
  public async getCurrentIntervalId(): Promise<BigNumber> {
    return await this.switchboard.sb.getCurrentIntervalId(this.address);
  }

  /**
   * Get the result of the interval from the Aggregator account.
   *
   * @param _intervalId - an optional intervalId to fetch a value for. If not provided then the latest result is used.
   *
   * @example
   * ```typescript
   * const [value, timestamp, medianTimestamp] = await aggregatorAccount.getIntervalResult();
   * console.log(value, timestamp, medianTimestamp);
   * ```
   *
   * @returns - A tuple containing the value, timestamp, and medianTimestamp of the interval.
   */
  public async getIntervalResult(
    _intervalId?: BigNumber | number
  ): Promise<[BigNumber, BigNumber, BigNumber]> {
    const intervalId = _intervalId ?? (await this.getCurrentIntervalId());
    return await this.switchboard.sb.getIntervalResult(
      this.address,
      intervalId
    );
  }
}
