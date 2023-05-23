import { fetchJobsFromIPFS } from "../ipfs.js";
import { SBDecimal } from "../SBDecimal.js";
import { Switchboard } from "../typechain-types/index.js";
import { EventCallback, Job } from "../types.js";

import { BigUtils, OracleJob } from "@switchboard-xyz/common";
import { Big } from "big.js";
import { BigNumber, ContractTransaction } from "ethers";

export interface AggregatorInitParams {
  address: string;
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
  initialValue: BigNumber;
  enableLegacyAdapter: boolean;
}

export interface AggregatorSetConfigParams {
  authority: string;
  name: string;
  queueAddress: string;
  batchSize: number;
  minOracleResults: number;
  minUpdateDelaySeconds: number;
  jobsHash: string;
  varianceThreshold?: Big;
  forceReportPeriod?: number;
  minJobResults?: number;
  enableLegacyAdapter?: boolean;
}

export interface AggregatorSetReadConfigParams {
  readCharge?: number;
  rewardEscrow?: string;
  readWhitelist?: string[];
  limitReadsToWhitelist?: boolean;
  enableLegacyAdapter?: boolean;
}

export class AggregatorAccount {
  constructor(readonly client: Switchboard, readonly address: string) {}

  async loadData(): Promise<any> {
    return await this.client.aggregators(this.address);
  }

  async loadJobs(): Promise<Array<OracleJob>> {
    const { jobsHash } = await this.client.aggregators(this.address);

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
   * @param client
   * @param account
   * @param params AggregatorInitParams initialization params
   */
  static async init(
    client: Switchboard,
    params: AggregatorInitParams
  ): Promise<[AggregatorAccount, ContractTransaction]> {
    const tx = await client.createAggregator(
      params.name,
      params.authority,
      params.batchSize,
      params.minUpdateDelaySeconds,
      params.minOracleResults,
      params.jobsHash, // I recommend using https://web3.storage/ for hosting jobs - it's free + fast!
      params.queueAddress,
      params.varianceThreshold,
      params.minJobResults,
      params.forceReportPeriod,
      params.enableLegacyAdapter, // AggregatorV3 Interface Support (2x's gas cost)
      {
        value: params.initialValue ?? 0,
      }
    );

    const aggregatorAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = client.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });

    return [new AggregatorAccount(client, aggregatorAddress), tx];
  }

  async latestValue(): Promise<number> {
    return (
      await this.client.aggregators(this.address)
    ).latestResult.value.toNumber();
  }

  async setConfig(
    params: AggregatorSetConfigParams
  ): Promise<ContractTransaction> {
    return this.client.setAggregatorConfig(
      this.address,
      params.name,
      params.authority,
      params.batchSize,
      params.minUpdateDelaySeconds,
      params.minOracleResults,
      params.jobsHash,
      params.queueAddress,
      Math.trunc(params.varianceThreshold.toNumber() * 10 ** 18),
      params.minJobResults,
      params.forceReportPeriod
    );
  }

  async setReadConfig(
    params: AggregatorSetReadConfigParams
  ): Promise<ContractTransaction> {
    return this.client.setAggregatorReadConfig(
      this.address,
      params.readCharge,
      params.rewardEscrow,
      params.readWhitelist,
      params.limitReadsToWhitelist,
      params.enableLegacyAdapter
    );
  }

  static watch(
    client: Switchboard,
    address: string,
    callback: EventCallback
  ): { stop: () => void } {
    const sb = client.on(client.filters.AggregatorUpdate(address), callback);
    return {
      stop: () => {
        sb.removeListener(client.filters.AggregatorUpdate(address), callback);
      },
    };
  }

  static async shouldReportValue(
    value: Big,
    aggregator: any
  ): Promise<boolean> {
    if ((aggregator.latestConfirmedRound?.numSuccess ?? 0) === 0) {
      return true;
    }
    const timestamp = Math.round(Date.now() / 1000);
    const varianceThreshold: Big = new SBDecimal(
      aggregator.varianceThreshold.value.toString(10),
      18,
      false
    ).toBig();
    const latestResult: Big = new SBDecimal(
      aggregator.latestConfirmedRound.result.value.toString(),
      18,
      !!aggregator.latestConfirmedRound.result.value
    ).toBig();
    const forceReportPeriod = aggregator.forceReportPeriod;
    const lastTimestamp = aggregator.latestConfirmedRound.roundOpenTimestamp;
    if (lastTimestamp.add(forceReportPeriod).lt(timestamp)) {
      return true;
    }

    let diff = BigUtils.safeDiv(latestResult, value);
    if (diff.abs().gt(1)) {
      diff = BigUtils.safeDiv(value, latestResult);
    }
    // I dont want to think about variance percentage when values cross 0.
    // Changes the scale of what we consider a "percentage".
    if (diff.lt(0)) {
      return true;
    }
    const change = new Big(1).minus(diff);
    return change.gt(varianceThreshold);
  }
}
