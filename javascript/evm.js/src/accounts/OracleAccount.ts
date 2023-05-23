import { SBDecimal } from "../SBDecimal.js";
import { Switchboard } from "../typechain-types/index.js";

import { BigNumber, ContractTransaction } from "ethers";

export interface SaveResultParams {
  value: SBDecimal;
  aggregatorAddress: string;
}

export interface OracleSaveResultParams {
  data: SaveResultParams[];
  oracleIdx: number;
  queueAddress: string;
}

export interface OracleInitParams {
  name: string;
  authority: string;
  queue: string;
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
    const [aggregatorAddresses, values]: [string[], BigNumber[]] =
      params.data.reduce(
        ([a, v], p) => {
          a.push(p.aggregatorAddress);
          v.push(p.value.toBigNumber());
          return [a, v];
        },
        [[] as string[], [] as BigNumber[]]
      );

    return await this.client.saveResults(
      aggregatorAddresses, // aggregator addresses - mapped to values
      values, // values to save
      params.queueAddress, // queue that all the aggregators are in
      params.oracleIdx // oracle's index in the queue
    );
  }
}
