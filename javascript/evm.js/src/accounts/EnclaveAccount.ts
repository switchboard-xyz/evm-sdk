import { EthersError } from "../errors.js";
import { parseMrEnclave } from "../parseMrEnclave.js";
import {
  EnclaveData,
  ISwitchboardProgram,
  RawMrEnclave,
  TransactionOptions,
  VerificationStatus,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { sleep } from "@switchboard-xyz/common";
import { ContractTransaction, Wallet } from "ethers";

/**
 * Defines the parameters for initializing a enclave
 *
 * ```typescript
 * {
 *   owner: '0xMyOwner',
 *   authority: '0xMyAuthority'
 * }
 * ```
 */
export interface EnclaveInitParams {
  // The address of the owner of the enclave
  owner: string;
  // The address of the authority for the enclave
  authority: string;
}

/**
 * A class representing a EnclaveAccount in the {@link SwitchboardAttestationService} contract.
 *
 *
 * ```typescript
 * const enclaveAccount = new EnclaveAccount(switchboardProgram, '0xYourEnclaveAccountAddress');
 * ```
 */

/**
 * Class for interacting with Enclave Accounts in the SwitchboardAttestationService.sol contract.
 *
 * ```typescript
 * // Instantiate an EnclaveAccount
 * const enclaveAccount = new EnclaveAccount(switchboardProgram, '0xYourEnclaveAccountAddress');
 *
 * // Load the data
 * const enclave = await enclaveAccount.loadData();
 * const name = enclave.name;
 * ```
 */
export class EnclaveAccount {
  /**
   * Constructor of EnclaveAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the EnclaveAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Method to load the data of the EnclaveAccount
   *
   * @returns {Promise<EnclaveData>} Promise that resolves to EnclaveData
   *
   * ```typescript
   * const enclaveData = await enclaveAccount.loadData();
   * ```
   */
  public async loadData(): Promise<EnclaveData> {
    return await this.switchboard.sb
      .enclaves(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param address - Address of the EnclaveAccount
   *
   * @returns {Promise<[EnclaveAccount, EnclaveData]>} Promise that resolves to tuple of EnclaveAccount and EnclaveData
   *
   * ```typescript
   * const [enclaveAccount, enclaveData] = await EnclaveAccount.load(switchboard, address);
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[EnclaveAccount, EnclaveData]> {
    const enclaveAccount = new EnclaveAccount(switchboard, address);
    const enclave = await enclaveAccount.loadData();
    return [enclaveAccount, enclave];
  }

  /**
   * Static method to initialize a Enclave
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param params - Enclave initialization parameters
   * @param [options] - Transaction options
   *
   * @returns {Promise<[EnclaveAccount, ContractTransaction]>} Promise that resolves to tuple of EnclaveAccount and ContractTransaction
   *
   * ```typescript
   * const [enclaveAccount, contractTransaction] = await EnclaveAccount.create(switchboard, params, options);
   * ```
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: EnclaveInitParams & { attestationQueue: string },
    options?: TransactionOptions
  ): Promise<[EnclaveAccount, ContractTransaction]> {
    const address = Wallet.createRandom().address;
    const tx = await switchboard.sendSbTxn(
      "createEnclaveWithId",
      [address, params.authority, params.attestationQueue, params.owner],
      options
    );
    return [new EnclaveAccount(switchboard, address), tx];
  }

  /**
   * Method to check if the enclave is valid
   *
   * @returns {Promise<boolean>} Promise that resolves to boolean value indicating whether the enclave is valid
   *
   * ```typescript
   * const isValid = await enclaveAccount.isEnclaveValid();
   * ```
   */
  public async isEnclaveValid(): Promise<boolean> {
    return await this.switchboard.sb
      .isEnclaveValid(this.address)
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
   * const contractTransaction = await enclaveAccount.forceOverrideVerify(options);
   * ```
   */
  public async forceOverrideVerify(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const enclaveData = await this.loadData();
    const tx = await this.switchboard.sendSbTxn(
      "forceOverrideVerify",
      [enclaveData.queueId, this.address],
      options
    );

    return tx;
  }

  /**
   * Method to update the enclave
   *
   * @param enclaveBuffer - RawMrEnclave data
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * ```typescript
   * const contractTransaction = await enclaveAccount.updateEnclave(enclaveBuffer, options);
   * ```
   */
  public async updateEnclave(
    enclaveBuffer: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const enclaveData = await this.loadData();
    const tx = await this.switchboard.sendSbTxn(
      "updateEnclave",
      [
        enclaveData.authority,
        enclaveData.queueId,
        parseMrEnclave(enclaveBuffer),
      ],
      options
    );

    return tx;
  }

  /**
   * Method to verify the enclave
   *
   * @param verifierAddress - Address of the verifier
   * @param mrEnclave - RawMrEnclave data
   * @param [enclaveIdx] - Enclave index
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * ```typescript
   * const contractTransaction = await enclaveAccount.verifyEnclave(verifierAddress, mrEnclave, enclaveIdx, options);
   * ```
   */
  public async verifyEnclave(
    verifierAddress: string,
    mrEnclave: RawMrEnclave,
    enclaveIdx?: number,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // const enclaveData = await this.loadData();
    // const attestationQueue = new AttestationQueueAccount(
    //   this.switchboard,
    //   enclaveData.queueAddress
    // );
    // const queueData = await attestationQueue.loadData();
    const tx = await this.switchboard.sendSbTxn(
      "verifyEnclave",
      [
        verifierAddress,
        this.address,
        enclaveIdx ??
          (await this.switchboard.sb
            .getEnclaveIdx(this.address)
            .catch(EthersError.handleError)),
        Math.floor(Date.now() / 1000),
        mrEnclave,
      ],
      options
    );

    return tx;
  }

  /**
   * Static method to get the {@link EnclaveAccount} for the given authority
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param authority - Address of the authority
   *
   * @returns {Promise<EnclaveAccount>} Promise that resolves to EnclaveAccount
   *
   * ```typescript
   * const enclaveAccount = await EnclaveAccount.authorityToAddress(switchboard, authority);
   * ```
   */
  public static async authorityToAddress(
    switchboard: ISwitchboardProgram,
    authority: string
  ): Promise<EnclaveAccount> {
    const address = await switchboard.sb
      .enclaveAuthorityToEnclaveAddress(authority)
      .catch(EthersError.handleError);
    return new EnclaveAccount(switchboard, address);
  }

  /**
   * Static method to initialize and await for the enclave verification
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param authority - Address of the authority
   * @param attestationQueueAddress - Attestation Queue Address
   * @param enclaveBuffer - RawMrEnclave data
   * @param options - Transaction options
   * @param [retryCount=3] - Number of retries for the operation
   *
   * @returns {Promise<EnclaveAccount>} Promise that resolves to EnclaveAccount
   *
   * ```typescript
   * const enclaveAccount = await EnclaveAccount.initAndAwaitVerification(switchboard, authority, attestationQueueAddress, enclaveBuffer, options, retryCount);
   * ```
   */
  public static async initAndAwaitVerification(
    switchboard: ISwitchboardProgram,
    authority: string,
    attestationQueueAddress: string,
    enclaveBuffer: RawMrEnclave,
    options?: TransactionOptions,
    retryCount = 3
  ): Promise<EnclaveAccount> {
    const enclaveAccount = await EnclaveAccount.authorityToAddress(
      switchboard,
      authority
    );
    const attestationQueueAccount = new AttestationQueueAccount(
      switchboard,
      attestationQueueAddress
    );
    const attestationQueue = await attestationQueueAccount.loadData();

    let sendEnclaveTx = false;
    let enclave: EnclaveData;
    try {
      enclave = await enclaveAccount.loadData();
      if (enclave.queueId !== attestationQueueAccount.address) {
        throw new Error(
          `Incorrect AttestationQueue provided, expected ${enclave.queueId}, received ${attestationQueueAccount.address}`
        );
      }

      if (
        enclave.verificationStatus !== VerificationStatus.VERIFICATION_SUCCESS
      ) {
        sendEnclaveTx = true;
      }
    } catch {
      sendEnclaveTx = true;
    }

    if (sendEnclaveTx) {
      const sendTx = await enclaveAccount.updateEnclave(enclaveBuffer, {
        ...options,
        value: attestationQueue.reward,
      });

      await sendTx.wait();
    }

    const finalEnclaveState = await enclaveAccount.pollVerification(retryCount);
    const verificationStatus = finalEnclaveState.verificationStatus;
    if (
      verificationStatus !== VerificationStatus.VERIFICATION_SUCCESS &&
      verificationStatus !== VerificationStatus.VERIFICATION_OVERRIDE
    ) {
      throw new Error(`Enclave was not verified successfully`);
    }

    return enclaveAccount;
  }

  /**
   * Method to poll for the enclave verification
   *
   * @param [retryCount=3] - Number of retries for the operation
   *
   * @returns {Promise<EnclaveData>} Promise that resolves to EnclaveData
   *
   * ```typescript
   * const enclaveData = await enclaveAccount.pollVerification(retryCount);
   * ```
   */
  public async pollVerification(retryCount = 3): Promise<EnclaveData> {
    let enclave = await this.loadData();

    let continuePoll = true;
    const pollStart = Date.now();
    const retrySeconds = 20;

    while (continuePoll && Date.now() - pollStart < 1000 * retrySeconds) {
      try {
        enclave = await this.loadData();

        switch (enclave.verificationStatus) {
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
          `Retry limit exceeded, failed to verify the enclave successfully`
        );
      }

      return this.pollVerification(--retryCount);
    }

    return enclave;
  }
}
