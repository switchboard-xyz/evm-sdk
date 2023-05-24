import { sendTxnWithOptions } from "../sendTxnWithOptions.js";
import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  ISwitchboardProgram,
  QuoteData,
  RawMrEnclave,
  TransactionOptions,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { ContractTransaction } from "ethers";

export interface QuoteInitParams {
  owner: string;
  authority: string;
}

export class QuoteAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Initialize a Quote
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Quote initialization params
   */
  public static async init(
    switchboard: ISwitchboardProgram,
    params: QuoteInitParams & { attestationQueue: string },
    options?: TransactionOptions
  ): Promise<[QuoteAccount, ContractTransaction]> {
    const tx = await switchboard.sendVsTxn(
      "createQuote",
      [params.authority, params.attestationQueue, params.owner],
      options
    );

    const quoteAddress = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = switchboard.sb.interface.parseLog(log);
      return sbLog.args.accountAddress as string;
    });
    return [new QuoteAccount(switchboard, quoteAddress), tx];
  }

  public async loadData(): Promise<QuoteData> {
    return await this.switchboard.vs.quotes(this.address);
  }

  /** Returns the attestationQueue address for the given verified Quote */
  public async validate(): Promise<string> {
    this.switchboard.hasAttestationService();

    const quoteData = await this.loadData();
    return await this.switchboard.vs.validate(quoteData.authority);
  }

  public async isQuoteValid(): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  public async forceOverrideVerify(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const quoteData = await this.loadData();
    const tx = await this.switchboard.sendVsTxn(
      "forceOverrideVerify",
      [quoteData.queueAddress, this.address],
      options
    );

    return tx;
  }

  public async updateQuote(
    quoteBuffer: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const quoteData = await this.loadData();
    const tx = await this.switchboard.sendVsTxn(
      "updateQuote",
      [quoteData.authority, quoteData.queueAddress, quoteBuffer],
      options
    );

    return tx;
  }

  public async verifyQuote(
    verifierAddress: string,
    mrEnclave: RawMrEnclave,
    quoteIdx?: number,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // const quoteData = await this.loadData();
    // const attestationQueue = new AttestationQueueAccount(
    //   this.switchboard,
    //   quoteData.queueAddress
    // );
    // const queueData = await attestationQueue.loadData();
    const tx = await this.switchboard.sendVsTxn(
      "verifyQuote",
      [
        verifierAddress,
        this.address,
        quoteIdx ?? (await this.switchboard.vs.getQuoteIdx(this.address)),
        Math.floor(Date.now() / 1000),
        mrEnclave,
      ],
      options
    );

    return tx;
  }

  public async getQuoteEnclaveMeasurement(): Promise<Uint8Array> {
    throw new Error(`Not implemented yet`);
  }
}
