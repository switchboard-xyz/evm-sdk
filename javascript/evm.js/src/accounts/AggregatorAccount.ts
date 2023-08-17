import { EthersError } from "../errors.js";
import { fetchJobsFromIPFS } from "../ipfs.js";
import type {
  AggregatorData,
  EventCallback,
  ISwitchboardProgram,
  Job,
  LatestRawValue,
  LatestResult,
  LatestResults,
  TransactionOptions,
} from "../types.js";
import { fromBigNumber, toBigNumber } from "../utils.js";

import { OracleQueueAccount } from "./OracleQueueAccount.js";

import { Big, OracleJob } from "@switchboard-xyz/common";
import type { BigNumber, BigNumberish, ContractTransaction } from "ethers";

/**
 * AggregatorInitParams defines the parameters required to initialize an Aggregator.
 * The Aggregator combines data from various oracles to provide a more reliable and secure data feed.
 *
 * ```typescript
 * const aggregatorInitParams = {
 *  authority: '0xYourAuthority',
 *  name: 'MyAggregator',
 *  queueAddress: '0xQueueAddress',
 *  batchSize: 10,
 *  minOracleResults: 5,
 *  minJobResults: 3,
 *  minUpdateDelaySeconds: 60,
 *  varianceThreshold: 0.05,
 *  forceReportPeriod: 600,
 *  jobsHash: '0xJobHash',
 *  enableLegacyAdapter: false,
 *  fundAmount: 0.25,
 * };
 * ```
 */
export interface AggregatorInitParams {
  /**
   * The owner of the Aggregator.
   * @defaultValue txn signer
   */
  authority?: string;
  /**
   * The name of the Aggregator.
   * @defaultValue empty string
   */
  name?: string;
  /**
   * The number of oracles to pull from the queue per batch.
   * @defaultValue 1
   */
  batchSize?: number;
  /**
   * The minimum number of oracle results to be gathered from Oracles.
   * @defaultValue 1
   */
  minOracleResults?: number;
  /**
   * The minimum number of job results to be accepted.
   * @defaultValue 1
   */
  minJobResults?: number;
  /**
   *  The minimum delay between updates in seconds.
   */
  minUpdateDelaySeconds: number;
  /**
   *  The acceptable level of variance in results.
   * @defaultValue 0, always report
   */
  varianceThreshold: number;
  /**
   *  The time period after which reporting is forced. Only applicable if varianceThreshold is greater than 0.
   * @defaultValue 0, always report
   */
  forceReportPeriod: number;
  /**
   *  The hash of the jobs to be processed.
   */
  jobsHash: string;
  /**
   *  Whether to enable history on the feed and track historical results.
   * @defaultValue false, dont track history
   */
  enableHistory: boolean;
  /**
   *  Amount of wETH to deposit into the feeds escrow to reward oracles for fulfilling updates
   * @defaultValue 0, do not start feed
   */
  fundAmount: BigNumberish;
}

/**
 * AggregatorSetConfigParams defines the parameters to configure an Aggregator.
 * It is a partial set of AggregatorInitParams, allowing you to modify specific configurations.
 * Variance threshold is required to indicate the level of variance tolerated.
 *
 * ```typescript
 * const aggregatorConfigParams = {
 *  varianceThreshold: 0.05,
 *  minUpdateDelaySeconds: 120
 * };
 * ```
 */
export type AggregatorSetConfigParams = Partial<AggregatorInitParams>;

/**
 * AggregatorSetReadConfigParams defines parameters to set read configurations for an Aggregator.
 * This allows you to modify the charge for reading data, set up a reward escrow, manage the read whitelist,
 * limit reads to whitelist and enable or disable legacy adapter.
 *
 * ```typescript
 * const aggregatorReadConfigParams = {
 *  readCharge: 100,
 *  rewardEscrow: '0xRewardEscrowAddress',
 *  readWhitelist: ['0xWhitelistedAddress1', '0xWhitelistedAddress2'],
 *  limitReadsToWhitelist: true,
 *  enableLegacyAdapter: false
 * };
 * ```
 */
export interface AggregatorSetReadConfigParams {
  readCharge?: number;
  rewardEscrow?: string;
  readWhitelist?: string[];
  limitReadsToWhitelist?: boolean;
  enableLegacyAdapter?: boolean;
}

/**
 * Class for interacting with Aggregator Accounts in the Switchboard.sol contract.
 *
 * ```typescript
 * // Instantiate an AggregatorAccount
 * const aggregatorAccount = new AggregatorAccount(switchboardProgram, '0xYourAggregatorAccountAddress');
 *
 * // Load the data
 * const aggregator = await aggregatorAccount.loadData();
 * const name = aggregator.name;
 *
 * // Get latest result
 * const result = await aggregatorAccount.latestValue();
 *
 * // Load the jobs
 * const jobs = await aggregatorAccount.getJobs();
 * ```
 */
export class AggregatorAccount {
  /**
   * Constructor of AggregatorAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the AggregatorAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Loads the Aggregator's data.
   *
   * ```typescript
   * const data = await aggregatorAccount.loadData();
   * console.log(data);
   * ```
   *
   * @returns - The data associated with this Aggregator account.
   */
  public async loadData(): Promise<AggregatorData> {
    return await this.switchboard.sb
      .aggregators(this.address)
      .catch(EthersError.handleError);
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
    const aggregator = await aggregatorAccount
      .loadData()
      .catch(EthersError.handleError);
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
      throw e;
    }
  }

  /**
   * Create a new AggregatorAccount.
   *
   * @param switchboard - An instance of the {@link SwitchboardProgram}.
   * @param params - The initialization parameters for this Aggregator.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const initParams: AggregatorInitParams = {...};
   * const [aggregatorAccount, tx] = await AggregatorAccount.create(switchboardProgram, initParams);
   * ```
   *
   * @returns - A new AggregatorAccount instance and the ContractTransaction.
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: AggregatorInitParams & {
      // The address of the queue that will fulfill update requests.
      queueAddress: string;
    },
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
        params.name ?? "",
        params.authority ?? (await switchboard.address),
        params.batchSize ?? 1,
        params.minUpdateDelaySeconds,
        params.minOracleResults ?? 1,
        params.jobsHash, // I recommend using https://web3.storage/ for hosting jobs - it's free + fast!
        params.queueAddress,
        toBigNumber(new Big(params.varianceThreshold)).toString(),
        params.minJobResults ?? 1,
        params.forceReportPeriod ?? 0,
        params.enableHistory ?? false,
      ],
      {
        ...options,
        value: params.fundAmount,
      }
    );
    const aggregatorId = await switchboard.pollTxnForSbEvent(tx, "accountId");
    return [new AggregatorAccount(switchboard, aggregatorId), tx];
  }

  private static convertRawResult(
    raw:
      | {
          value: BigNumber;
          timestamp: BigNumber;
        }
      | LatestRawValue
  ): LatestResult {
    const result = fromBigNumber(raw.value);
    const timestamp = raw.timestamp.toNumber();
    return { result, timestamp };
  }

  /**
   * Gets the latest value from the Aggregator account.
   *
   *
   * ```typescript
   * const latestValue = await aggregatorAccount.fetchLatestValue();
   * console.log(latestValue.value.toNumber());
   * ```
   *
   * @returns - The latest result stored in the aggregator on-chain.
   */
  public async fetchLatestResult(): Promise<LatestResult> {
    const latestValue: LatestRawValue = await this.switchboard.sb
      .viewLatestResult(this.address)
      .catch(EthersError.handleError);
    return AggregatorAccount.convertRawResult(latestValue);
  }

  /**
   * Gets the current set of results for the Aggregator account.
   *
   *
   * ```typescript
   * const latestResults = await aggregatorAccount.fetchAllResults();
   * console.log(latestValue);
   * ```
   *
   * @returns - The list of accepted results stored in the aggregatorResults mapping.
   */
  public async fetchAllResults(): Promise<LatestResults> {
    const results = await this.switchboard.sb
      .viewAggregatorResults(this.address)
      .catch(EthersError.handleError);
    return results.map((r) => {
      const result = AggregatorAccount.convertRawResult(r);
      return { ...result, oracleId: r.oracleId };
    });
  }

  /**
   * Sets the configuration for the Aggregator account.
   *
   * @param params - The new configuration parameters.
   * @param options - (Optional) Transaction options.
   *
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
    const aggregatorData = await this.loadData();

    const oracleQueue = new OracleQueueAccount(
      this.switchboard,
      aggregatorData.queueId
    );

    const tx = await this.switchboard.sendSbTxn(
      "setAggregatorConfig",
      [
        this.address,
        params.name ?? aggregatorData.name,
        params.authority ?? aggregatorData.authority,
        params.batchSize ?? aggregatorData.config.batchSize,
        params.minUpdateDelaySeconds ??
          aggregatorData.config.minUpdateDelaySeconds,
        params.minOracleResults ?? aggregatorData.config.minOracleResults,
        params.jobsHash ?? aggregatorData.jobsHash,
        oracleQueue.address,
        params.varianceThreshold === undefined
          ? aggregatorData.config.varianceThreshold
          : toBigNumber(new Big(params.varianceThreshold)),
        params.minJobResults === undefined
          ? aggregatorData.config.minJobResults
          : Math.trunc(params.minJobResults),
        params.forceReportPeriod === undefined
          ? aggregatorData.config.forceReportPeriod
          : Math.trunc(params.forceReportPeriod),
        params.enableHistory ?? aggregatorData.historyEnabled,
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
   * Fund the escrow of the Aggregator Account
   *
   * @param fundAmount - The amount of ETH to deposit into an Aggregator's lease escrow.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await aggregatorAccount.escrowFund(100000);
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowFund(
    fundAmount: BigNumberish,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "aggregatorEscrowFund",
      [this.address],
      {
        ...options,
        value: fundAmount,
      }
    );
    return tx;
  }

  /**
   * Withdraw from the escrow of the Aggregator Account
   *
   * @parm withdrawAmount - The amount of ETH to remove from an Aggregator's lease escrow.
   * @parm withdrawAddress - The account to send the withdrawed funds to.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await aggregatorAccount.escrowWithdraw(100000, '0xMyWithdrawWallet');
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowWithdraw(
    withdrawAmount: BigNumberish,
    withdrawAddress: string,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO: Check aggregator authority == msg.sender
    // TODO: Check aggregator has enough funds
    const tx = await this.switchboard.sendSbTxn(
      "aggregatorEscrowWithdraw",
      [withdrawAddress, this.address, withdrawAmount],
      options
    );
    return tx;
  }

  /**
   * Get the latest result from an aggregator to access historical data
   *
   * ```typescript
   * const intervalId = await aggregatorAccount.getCurrentIntervalId();
   * console.log(intervalId);
   * ```
   *
   * @returns - The current interval ID.
   */
  public async getCurrentIntervalId(): Promise<BigNumber> {
    return await this.switchboard.sb
      .getCurrentIntervalId(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Get the result of the interval from the Aggregator account.
   *
   * @param _intervalId - an optional intervalId to fetch a value for. If not provided then the latest result is used.
   *
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
    return await this.switchboard.sb
      .aggregatorHistory(this.address, intervalId)
      .catch(EthersError.handleError);
  }
}
