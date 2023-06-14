import { EthersError } from "../errors.js";
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
import { ContractTransaction, Wallet } from "ethers";

/**
 * Defines the parameters for initializing a quote
 *
 * ```typescript
 * {
 *   owner: '0xMyOwner',
 *   authority: '0xMyAuthority'
 * }
 * ```
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
 *
 * ```typescript
 * const quoteAccount = new QuoteAccount(switchboardProgram, '0xYourQuoteAccountAddress');
 * ```
 */

/**
 * Class for interacting with Quote Accounts in the SwitchboardAttestationService.sol contract.
 *
 * ```typescript
 * // Instantiate an QuoteAccount
 * const quoteAccount = new QuoteAccount(switchboardProgram, '0xYourQuoteAccountAddress');
 *
 * // Load the data
 * const quote = await quoteAccount.loadData();
 * const name = quote.name;
 * ```
 */
export class QuoteAccount {
  /**
   * Constructor of QuoteAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the QuoteAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Method to load the data of the QuoteAccount
   *
   * @returns {Promise<QuoteData>} Promise that resolves to QuoteData
   *
   * ```typescript
   * const quoteData = await quoteAccount.loadData();
   * ```
   */
  public async loadData(): Promise<QuoteData> {
    return await this.switchboard.sb
      .quotes(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param address - Address of the QuoteAccount
   *
   * @returns {Promise<[QuoteAccount, QuoteData]>} Promise that resolves to tuple of QuoteAccount and QuoteData
   *
   * ```typescript
   * const [quoteAccount, quoteData] = await QuoteAccount.load(switchboard, address);
   * ```
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
   * ```typescript
   * const [quoteAccount, contractTransaction] = await QuoteAccount.create(switchboard, params, options);
   * ```
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: QuoteInitParams & { attestationQueue: string },
    options?: TransactionOptions
  ): Promise<[QuoteAccount, ContractTransaction]> {
    const address = Wallet.createRandom().address;
    const tx = await switchboard.sendSbTxn(
      "createQuoteWithId",
      [address, params.authority, params.attestationQueue, params.owner],
      options
    );
    return [new QuoteAccount(switchboard, address), tx];
  }

  /**
   * Method to check if the quote is valid
   *
   * @returns {Promise<boolean>} Promise that resolves to boolean value indicating whether the quote is valid
   *
   * ```typescript
   * const isValid = await quoteAccount.isQuoteValid();
   * ```
   */
  public async isQuoteValid(): Promise<boolean> {
    return await this.switchboard.sb
      .isQuoteValid(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Method to force an override verification
   *
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * ```typescript
   * const contractTransaction = await quoteAccount.forceOverrideVerify(options);
   * ```
   */
  public async forceOverrideVerify(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const quoteData = await this.loadData();
    const tx = await this.switchboard.sendSbTxn(
      "forceOverrideVerify",
      [quoteData.queueId, this.address],
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
   * ```typescript
   * const contractTransaction = await quoteAccount.updateQuote(quoteBuffer, options);
   * ```
   */
  public async updateQuote(
    quoteBuffer: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const quoteData = await this.loadData();
    const tx = await this.switchboard.sendSbTxn(
      "updateQuote",
      [quoteData.authority, quoteData.queueId, parseMrEnclave(quoteBuffer)],
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
   * ```typescript
   * const contractTransaction = await quoteAccount.verifyQuote(verifierAddress, mrEnclave, quoteIdx, options);
   * ```
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
    const tx = await this.switchboard.sendSbTxn(
      "verifyQuote",
      [
        verifierAddress,
        this.address,
        quoteIdx ??
          (await this.switchboard.sb
            .getQuoteIdx(this.address)
            .catch(EthersError.handleError)),
        Math.floor(Date.now() / 1000),
        mrEnclave,
      ],
      options
    );

    return tx;
  }

  /**
   * Static method to get the {@link QuoteAccount} for the given authority
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param authority - Address of the authority
   *
   * @returns {Promise<QuoteAccount>} Promise that resolves to QuoteAccount
   *
   * ```typescript
   * const quoteAccount = await QuoteAccount.authorityToAddress(switchboard, authority);
   * ```
   */
  public static async authorityToAddress(
    switchboard: ISwitchboardProgram,
    authority: string
  ): Promise<QuoteAccount> {
    const address = await switchboard.sb
      .quoteAuthorityToQuoteAddress(authority)
      .catch(EthersError.handleError);
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
   * ```typescript
   * const quoteAccount = await QuoteAccount.initAndAwaitVerification(switchboard, authority, attestationQueueAddress, quoteBuffer, options, retryCount);
   * ```
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
      if (quote.queueId !== attestationQueueAccount.address) {
        throw new Error(
          `Incorrect AttestationQueue provided, expected ${quote.queueId}, received ${attestationQueueAccount.address}`
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
   * Method to poll for the quote verification
   *
   * @param [retryCount=3] - Number of retries for the operation
   *
   * @returns {Promise<QuoteData>} Promise that resolves to QuoteData
   *
   * ```typescript
   * const quoteData = await quoteAccount.pollVerification(retryCount);
   * ```
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
