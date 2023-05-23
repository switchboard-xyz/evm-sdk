import { Switchboard } from "../typechain-types/index.js";

import { AggregatorAccount } from "./AggregatorAccount.js";

import Big from "big.js";
import { ContractTransaction } from "ethers";

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
