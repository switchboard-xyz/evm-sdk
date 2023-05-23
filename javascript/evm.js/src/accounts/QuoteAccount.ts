import { SwitchboardProgram } from "../SwitchboardProgram.js";
import { SwitchboardAttestationService } from "../typechain-types/index.js";
import { RawMrEnclave } from "../types.js";

import { ContractTransaction } from "ethers";

export interface QuoteInitParams {
  name: string;
  authority: string;
  queue: string;
}

export type QuoteData = Awaited<
  ReturnType<SwitchboardAttestationService["quotes"]>
>;

export class QuoteAccount {
  constructor(
    readonly switchboard: SwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize a Quote
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Quote initialization params
   */
  public static async init(
    switchboard: SwitchboardProgram,
    params: QuoteInitParams
  ): Promise<[QuoteAccount, ContractTransaction]> {
    const tx = await switchboard.vs.createQuote(
      params.name,
      params.authority,
      params.queue
    );

    const oracleAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new QuoteAccount(switchboard, oracleAddress), tx];
  }

  public async loadData(): Promise<QuoteData> {
    return await this.switchboard.vs.quotes(this.address);
  }

  public async validate(): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async isQuoteValid(): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async forceOverride(): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async updateQuote(quote: RawMrEnclave): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async verifyQuote(): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  public async getQuoteEnclaveMeasurement(): Promise<Uint8Array> {
    throw new Error(`Not implemented yet`);
  }
}
