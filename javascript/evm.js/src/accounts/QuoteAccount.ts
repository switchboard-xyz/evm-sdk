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

/**
 * Defines the parameters for initializing a quote
 */
export interface QuoteInitParams {
  // The address of the owner of the quote
  owner: string;
  // The address of the authority for the quote
  authority: string;
}

/**
 * A class representing a QuoteAccount in the {@link SwitchboardAttestationService} contract.
 *
 * @example
 * ```typescript
 * const quoteAccount = new QuoteAccount(switchboardProgram, '0xYourQuoteAccountAddress');
 * ```
 */
export class QuoteAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Method to load the data of the QuoteAccount
   *
   * @returns {Promise<QuoteData>} Promise that resolves to QuoteData
   *
   * @example
   * const quoteData = await quoteAccount.loadData();
   */
  public async loadData(): Promise<QuoteData> {
    return await this.switchboard.vs.quotes(this.address);
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param address - Address of the QuoteAccount
   *
   * @returns {Promise<[QuoteAccount, QuoteData]>} Promise that resolves to tuple of QuoteAccount and QuoteData
   *
   * @example
   * const [quoteAccount, quoteData] = await QuoteAccount.load(switchboard, address);
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
   * Static method to initialize a Quote
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param params - Quote initialization parameters
   * @param [options] - Transaction options
   *
   * @returns {Promise<[QuoteAccount, ContractTransaction]>} Promise that resolves to tuple of QuoteAccount and ContractTransaction
   *
   * @example
   * const [quoteAccount, contractTransaction] = await QuoteAccount.init(switchboard, params, options);
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

  /**
   * Method to return the attestationQueue address for the given verified Quote
   *
   * @returns {Promise<string>} Promise that resolves to attestationQueue address
   *
   * @example
   * const attestationQueueAddress = await quoteAccount.validate();
   */
  public async validate(): Promise<string> {
    this.switchboard.hasAttestationService();

    const quoteData = await this.loadData();
    return await this.switchboard.vs.validate(quoteData.authority);
  }

  /**
   * Method to check if the quote is valid
   *
   * @returns {Promise<boolean>} Promise that resolves to boolean value indicating whether the quote is valid
   *
   * @example
   * const isValid = await quoteAccount.isQuoteValid();
   */
  public async isQuoteValid(): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Method to force an override verification
   *
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * @example
   * const contractTransaction = await quoteAccount.forceOverrideVerify(options);
   */
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

  /**
   * Method to update the quote
   *
   * @param quoteBuffer - RawMrEnclave data
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * @example
   * const contractTransaction = await quoteAccount.updateQuote(quoteBuffer, options);
   */
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

  /**
   * Method to verify the quote
   *
   * @param verifierAddress - Address of the verifier
   * @param mrEnclave - RawMrEnclave data
   * @param [quoteIdx] - Quote index
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * @example
   * const contractTransaction = await quoteAccount.verifyQuote(verifierAddress, mrEnclave, quoteIdx, options);
   */
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

  /**
   * Method to get the quote enclave measurement
   *
   * @returns {Promise<Uint8Array>} Promise that resolves to Uint8Array
   *
   * @example
   * const measurement = await quoteAccount.getQuoteEnclaveMeasurement();
   */
  public async getQuoteEnclaveMeasurement(): Promise<Uint8Array> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Static method to get the {@link QuoteAccount} for the given authority
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param authority - Address of the authority
   *
   * @returns {Promise<QuoteAccount>} Promise that resolves to QuoteAccount
   *
   * @example
   * const quoteAccount = await QuoteAccount.authorityToAddress(switchboard, authority);
   */
  public static async authorityToAddress(
    switchboard: ISwitchboardProgram,
    authority: string
  ): Promise<QuoteAccount> {
    const address = await switchboard.vs.quoteAuthorityToQuoteAddress(
      authority
    );
    return new QuoteAccount(switchboard, address);
  }

  /**
   * Static method to initialize and await for the quote verification
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param authority - Address of the authority
   * @param attestationQueueAddress - Attestation Queue Address
   * @param quoteBuffer - RawMrEnclave data
   * @param options - Transaction options
   * @param [retryCount=3] - Number of retries for the operation
   *
   * @returns {Promise<QuoteAccount>} Promise that resolves to QuoteAccount
   *
   * @example
   * const quoteAccount = await QuoteAccount.initAndAwaitVerification(switchboard, authority, attestationQueueAddress, quoteBuffer, options, retryCount);
   */
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

  /**
   * @async
   * @function pollVerification
   * @description Method to poll for the quote verification
   *
   * @param {number} [retryCount=3] - Number of retries for the operation
   *
   * @returns {Promise<QuoteData>} Promise that resolves to QuoteData
   *
   * @example
   * const quoteData = await quoteAccount.pollVerification(retryCount);
   */
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
