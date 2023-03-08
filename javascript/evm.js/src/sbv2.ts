import { Switchboard, Switchboard__factory } from "./typechain-types";

import { OracleJob } from "@switchboard-xyz/common";
import Big from "big.js";
import { ContractTransaction, Wallet } from "ethers";
import * as ethers from "ethers";

export { Switchboard, Switchboard__factory } from "./typechain-types";
export { IOracleJob, OracleJob } from "@switchboard-xyz/common";

export const SWITCHBOARD_DEVNET_ADDRESS = ``;
export const SWITCHBOARD_TESTNET_ADDRESS = ``;
export const SWITCHBOARD_MAINNET_ADDRESS = ``;

const IpfsGateways = [
  "https://ipfs.io/ipfs/",
  "https://ipfs.infura.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];

export interface Job {
  name: string;
  data: string;
  weight: number;
}

export type EventCallback = (
  e: any
) => Promise<void> /** | (() => Promise<void>) */;

export class SBDecimal {
  constructor(
    readonly mantissa: string,
    readonly scale: number,
    readonly neg: boolean
  ) {}

  toBig(): Big {
    const oldDp = Big.DP;
    Big.DP = 18;
    let result = new Big(this.mantissa);
    if (this.neg === true) {
      result = result.mul(-1);
    }
    const TEN = new Big(10);
    result = safeDiv(result, TEN.pow(this.scale));
    Big.DP = oldDp;
    return result;
  }

  // to signed big number
  toBigNumber(): ethers.BigNumber {
    let mantissa = this.mantissa;
    let scale = this.scale;
    while (scale < 18) {
      mantissa += "0";
      scale++;
    }
    return ethers.BigNumber.from(mantissa).mul(this.neg ? -1 : 1);
  }

  static fromBig(val: Big): SBDecimal {
    const value = val.c.slice();
    const e = val.e + 1;
    while (value.length - e > 18) {
      value.pop();
    }

    // Aptos decimals cannot have a negative scale
    while (value.length - e < 0) {
      value.push(0);
    }

    return new SBDecimal(value.join(""), value.length - e, val.s === -1);
  }

  static fromObj(obj: Object): SBDecimal {
    const properties = ["mantissa", "scale", "neg"];
    properties.forEach((p) => {
      if (!(p in obj)) {
        throw new Error(`Object is missing property ${p}`);
      }
    });

    return new SBDecimal(obj["mantissa"], obj["scale"], obj["neg"]);
  }
}

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
  initialValue: ethers.BigNumber;
  enableLegacyAdapter: boolean;
}

export interface SaveResultParams {
  value: SBDecimal;
  aggregatorAddress: string;
}

export interface OracleSaveResultParams {
  data: SaveResultParams[];
  oracleIdx: number;
  queueAddress: string;
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

export interface OracleInitParams {
  name: string;
  authority: string;
  queue: string;
}

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

export function getWallet(privateKey: string, rpc: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  return new Wallet(privateKey, provider);
}

export function getSwitchboard(address: string, wallet: Wallet) {
  return Switchboard__factory.connect(address, wallet);
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

    let diff = safeDiv(latestResult, value);
    if (diff.abs().gt(1)) {
      diff = safeDiv(value, latestResult);
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

export class OracleAccount {
  constructor(readonly client: Switchboard, readonly address: string) {}

  /**
   * Initialize a Oracle
   * @param client
   * @param account
   * @param params Oracle initialization params
   */
  static async init(
    client: Switchboard,
    params: OracleInitParams
  ): Promise<[OracleAccount, ContractTransaction]> {
    const tx = await client.createOracle(
      params.name,
      params.authority,
      params.queue
    );

    const oracleAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = client.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new OracleAccount(client, oracleAddress), tx];
  }

  async loadData(): Promise<any> {
    await this.client.oracles(this.address);
  }

  /**
   * Oracle Heartbeat Action
   */
  async heartbeat(): Promise<ContractTransaction> {
    return await this.client.heartbeat(this.address);
  }

  /**
   * Oracle Bulk Save Results Action
   */
  async saveManyResults(
    params: OracleSaveResultParams
  ): Promise<ContractTransaction> {
    const [aggregatorAddresses, values]: [string[], ethers.BigNumber[]] =
      params.data.reduce(
        ([a, v], p) => {
          a.push(p.aggregatorAddress);
          v.push(p.value.toBigNumber());
          return [a, v];
        },
        [[] as string[], [] as ethers.BigNumber[]]
      );

    return await this.client.saveResults(
      aggregatorAddresses, // aggregator addresses - mapped to values
      values, // values to save
      params.queueAddress, // queue that all the aggregators are in
      params.oracleIdx // oracle's index in the queue
    );
  }
}

export class OracleQueueAccount {
  constructor(readonly client: Switchboard, readonly address: string) {}

  /**
   * Initialize an OracleQueueAccount
   * @param client
   * @param account
   * @param params OracleQueueAccount initialization params
   */
  static async init(
    client: Switchboard,
    address: string,
    params: OracleQueueInitParams
  ): Promise<[OracleQueueAccount, ContractTransaction]> {
    const tx = await client.createOracleQueue(
      params.name,
      params.authority,
      params.unpermissionedFeedsEnabled,
      params.maxSize,
      params.reward,
      params.oracleTimeout
    );
    const queueAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = client.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new OracleQueueAccount(client, queueAddress), tx];
  }

  async setConfigs(
    params: OracleQueueSetConfigsParams
  ): Promise<ContractTransaction> {
    return await this.client.setQueueConfig(
      this.address,
      params.name,
      params.authority,
      params.unpermissionedFeedsEnabled,
      params.maxSize,
      params.reward,
      params.oracleTimeout
    );
  }

  async loadData(): Promise<any> {
    return await this.client.queues(this.address);
  }
}

function safeDiv(number_: Big, denominator: Big, decimals = 20): Big {
  const oldDp = Big.DP;
  Big.DP = decimals;
  const result = number_.div(denominator);
  Big.DP = oldDp;
  return result;
}

export async function fetchAggregators(
  client: Switchboard,
  authority: string
): Promise<any[]> {
  const data = await client.queryFilter(
    client.filters.AggregatorAccountInit(authority)
  );
  return Promise.all(
    data.map((d) => {
      const aggregatorAddress = d.args?.accountAddress;
      if (aggregatorAddress) {
        return new AggregatorAccount(client, aggregatorAddress).loadData();
      }
    })
  );
}

/**
 * Fetch IPFS Hash from Gateways
 * @param hash ipfs hash
 * @param gatewayIndex index of gateway to use
 * @returns
 */
export async function fetchJobsFromIPFS(
  hash: string,
  gatewayIndex = 0
): Promise<Job[]> {
  try {
    const response = await fetch(`${IpfsGateways[gatewayIndex]}${hash}`);
    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch content from gateway ${IpfsGateways[gatewayIndex]}. Error: ${error}`
    );

    if (gatewayIndex === IpfsGateways.length - 1) {
      throw new Error(
        `Failed to fetch content from all gateways. Last error: ${error}`
      );
    }

    return fetchJobsFromIPFS(hash, ++gatewayIndex);
  }
}
