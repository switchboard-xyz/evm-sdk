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

export type AggregatorSetConfigParams = Partial<AggregatorInitParams> & {
  varianceThreshold: number;
};

export interface AggregatorSetReadConfigParams {
  readCharge?: number;
  rewardEscrow?: string;
  readWhitelist?: string[];
  limitReadsToWhitelist?: boolean;
  enableLegacyAdapter?: boolean;
}

export class AggregatorAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  public async loadData(): Promise<AggregatorData> {
    return await this.switchboard.sb.aggregators(this.address);
  }

  /**
   * Load and fetch the account data
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
   * Initialize an Aggregator
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params AggregatorInitParams initialization params
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

  public async latestValue(): Promise<number> {
    return (
      await this.switchboard.sb.aggregators(this.address)
    ).latestResult.value.toNumber();
  }

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

  public async escrowFund(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowWithdraw(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async getCurrentIntervalId(): Promise<number> {
    throw new Error(`Not implemented yet`);
  }

  public async getIntervalResult(): Promise<[BigNumber, BigNumber, BigNumber]> {
    throw new Error(`Not implemented yet`);
  }
}
