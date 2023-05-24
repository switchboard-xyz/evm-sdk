import { SBDecimal } from "../SBDecimal.js";
import {
  ISwitchboardProgram,
  OracleData,
  TransactionOptions,
} from "../types.js";

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
  name?: string;
  authority: string;
}

export class OracleAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize a Oracle
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Oracle initialization params
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

  public async loadData(): Promise<OracleData> {
    return await this.switchboard.sb.oracles(this.address);
  }

  public async setConfig(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async escrowWithdraw(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Oracle Heartbeat Action
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
