import { OracleJob } from "@switchboard-xyz/common";
import Big from "big.js";
import { Wallet, ContractTransaction } from "ethers";
import ethers from "ethers";
import { Switchboard__factory, Switchboard } from "./typechain-types";
export { OracleJob, IOracleJob } from "@switchboard-xyz/common";
import { Web3Storage } from "web3.storage";

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

  static fromBig(val: Big): SBDecimal {
    const value = val.c.slice();
    let e = val.e + 1;
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
}

export interface AggregatorSaveResultParams {
  oracleIdx: number;
  value: SBDecimal;
  jobsChecksum: string;
}

export interface OracleSaveResultParams extends AggregatorSaveResultParams {
  aggregatorAddress: string;
}

export interface AggregatorSetConfigParams {
  authority: string;
  name: string;
  queueAddress: string;
  batchSize: number;
  minOracleResults: number;
  minUpdateDelaySeconds: number;
  jobsHash: string;
}

export interface AggregatorSetResponseConfigParams {
  varianceThreshold?: Big;
  forceReportPeriod?: number;
  minJobResults?: number;
}

export interface AggregatorSetReadConfigParams {
  readCharge?: number;
  rewardEscrow?: string;
  readWhitelist?: string[];
  limitReadsToWhitelist?: boolean;
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
      params.address,
      params.name,
      params.authority,
      params.batchSize,
      params.minUpdateDelaySeconds,
      params.minOracleResults,
      params.jobsHash, // I recommend using https://web3.storage/ for hosting jobs - it's free + fast!
      params.queueAddress,
      params.varianceThreshold,
      params.minJobResults,
      params.forceReportPeriod
    );

    return [new AggregatorAccount(client, params.address), tx];
  }

  async latestValue(): Promise<number> {
    return (
      await this.client.aggregators(this.address)
    ).latestResult.value.toNumber();
  }

  async saveResult(
    params: AggregatorSaveResultParams
  ): Promise<ContractTransaction> {
    return this.client.saveResult(
      this.address,
      params.oracleIdx,
      params.value.mantissa
    );
  }

  async openRound(): Promise<ContractTransaction> {
    return await this.client.openRound(this.address);
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
      params.queueAddress
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
    address: string,
    params: OracleInitParams
  ): Promise<[OracleAccount, ContractTransaction]> {
    const tx = await client.createOracle(
      address,
      params.name,
      params.authority,
      params.queue
    );
    return [new OracleAccount(client, address), tx];
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
  async saveManyResult(
    params: OracleSaveResultParams[]
  ): Promise<ContractTransaction> {
    const [aggregatorAddresses, oracleIdxs, values] = params.reduce(
      ([a, o, v], p) => {
        a.push(p.aggregatorAddress);
        o.push(p.oracleIdx);
        v.push(p.value.mantissa);
        return [a, o, v];
      },
      [[], [], []]
    );
    return await this.client.saveResults(
      aggregatorAddresses,
      oracleIdxs,
      values
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
      address,
      params.name,
      params.authority,
      params.unpermissionedFeedsEnabled,
      params.maxSize,
      params.reward,
      params.oracleTimeout
    );

    return [new OracleQueueAccount(client, address), tx];
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
 * Write Job to web3.Storage
 */
export function writeJobsToWeb3Storage(
  jobs: Job[],
  token: string
): Promise<string> {
  const client = new Web3Storage({ token });
  const content = new File([JSON.stringify(jobs)], "", {
    type: "application/json",
  });
  const cid = client.put([content], {
    wrapWithDirectory: false,
  });
  return cid;
}

/**
 * Fetch IPFS Hash from Gateways
 * @param hash ipfs hash
 * @param gatewayIndex index of gateway to use
 * @returns
 */
async function fetchJobsFromIPFS(
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

    gatewayIndex = (gatewayIndex + 1) % IpfsGateways.length;
    return fetchJobsFromIPFS(hash);
  }
}
