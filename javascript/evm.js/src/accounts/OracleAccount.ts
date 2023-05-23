import { SBDecimal } from "../SBDecimal.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
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

export type OracleData = Awaited<ReturnType<Switchboard["oracles"]>>;

export class OracleAccount {
  constructor(
    readonly switchboard: SwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize a Oracle
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Oracle initialization params
   */
  public static async init(
    switchboard: SwitchboardProgram,
    params: OracleInitParams
  ): Promise<[OracleAccount, ContractTransaction]> {
    const tx = await switchboard.sb.createOracle(
      params.name,
      params.authority,
      params.queue
    );

    const oracleAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new OracleAccount(switchboard, oracleAddress), tx];
  }

  public async loadData(): Promise<OracleData> {
    return await this.switchboard.sb.oracles(this.address);
  }

  public async setConfig(): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowWithdraw(): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Oracle Heartbeat Action
   */
  public async heartbeat(): Promise<ContractTransaction> {
    return await this.switchboard.sb.heartbeat(this.address);
  }

  /**
   * Oracle Bulk Save Results Action
   */
  public async saveManyResults(
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

    return await this.switchboard.sb.saveResults(
      aggregatorAddresses, // aggregator addresses - mapped to values
      values, // values to save
      params.queueAddress, // queue that all the aggregators are in
      params.oracleIdx // oracle's index in the queue
    );
  }
}
