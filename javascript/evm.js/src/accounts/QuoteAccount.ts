import { parseMrEnclave } from "../parseMrEnclave.js";
import {
  ISwitchboardProgram,
  QuoteData,
  RawMrEnclave,
  TransactionOptions,
  VerificationStatus,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { sleep } from "@switchboard-xyz/common";
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

  public async loadData(): Promise<QuoteData> {
    return await this.switchboard.vs.quotes(this.address);
  }

  /**
   * Load and fetch the account data
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[QuoteAccount, QuoteData]> {
    const quoteAccount = new QuoteAccount(switchboard, address);
    const quote = await quoteAccount.loadData();
    return [quoteAccount, quote];
  }

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
    const quoteAddress = await switchboard.pollTxnForVsEvent(
      tx,
      "accountAddress"
    );
    return [new QuoteAccount(switchboard, quoteAddress), tx];
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
      [
        quoteData.authority,
        quoteData.queueAddress,
        parseMrEnclave(quoteBuffer),
      ],
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

  public static async authorityToAddress(
    switchboard: ISwitchboardProgram,
    authority: string
  ): Promise<QuoteAccount> {
    const address = await switchboard.vs.quoteAuthorityToQuoteAddress(
      authority
    );
    return new QuoteAccount(switchboard, address);
  }

  public static async initAndAwaitVerification(
    switchboard: ISwitchboardProgram,
    authority: string,
    attestationQueueAddress: string,
    quoteBuffer: RawMrEnclave,
    options?: TransactionOptions,
    retryCount = 3
  ): Promise<QuoteAccount> {
    const quoteAccount = await QuoteAccount.authorityToAddress(
      switchboard,
      authority
    );
    const attestationQueueAccount = new AttestationQueueAccount(
      switchboard,
      attestationQueueAddress
    );
    const attestationQueue = await attestationQueueAccount.loadData();

    let sendQuoteTx = false;
    let quote: QuoteData;
    try {
      quote = await quoteAccount.loadData();
      if (quote.queueAddress !== attestationQueueAccount.address) {
        throw new Error(
          `Incorrect AttestationQueue provided, expected ${quote.queueAddress}, received ${attestationQueueAccount.address}`
        );
      }

      if (
        quote.verificationStatus !== VerificationStatus.VERIFICATION_SUCCESS
      ) {
        sendQuoteTx = true;
      }
    } catch {
      sendQuoteTx = true;
    }

    if (sendQuoteTx) {
      const sendTx = await quoteAccount.updateQuote(quoteBuffer, {
        ...options,
        value: attestationQueue.reward,
      });

      await sendTx.wait();
    }

    const finalQuoteState = await quoteAccount.pollVerification(retryCount);
    const verificationStatus = finalQuoteState.verificationStatus;
    if (
      verificationStatus !== VerificationStatus.VERIFICATION_SUCCESS &&
      verificationStatus !== VerificationStatus.VERIFICATION_OVERRIDE
    ) {
      throw new Error(`Quote was not verified successfully`);
    }

    return quoteAccount;
  }

  public async pollVerification(retryCount = 3): Promise<QuoteData> {
    let quote = await this.loadData();

    let continuePoll = true;
    const pollStart = Date.now();
    const retrySeconds = 20;

    while (continuePoll && Date.now() - pollStart < 1000 * retrySeconds) {
      try {
        quote = await this.loadData();

        switch (quote.verificationStatus) {
          case VerificationStatus.VERIFICATION_SUCCESS:
          case VerificationStatus.VERIFICATION_OVERRIDE: {
            continuePoll = false;
            break;
          }
          case VerificationStatus.VERIFICATION_FAILURE: {
            continuePoll = false;
            throw new Error("Oracle SGX measurement has failed verification");
          }
          default: {
            await sleep(2000);
          }
        }
      } catch (error) {
        console.error(error);
        // continue
      }
    }

    if (continuePoll) {
      if (retryCount <= 0) {
        throw new Error(
          `Retry limit exceeded, failed to verify the quote successfully`
        );
      }

      return this.pollVerification(--retryCount);
    }

    return quote;
  }
}
