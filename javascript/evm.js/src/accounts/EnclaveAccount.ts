import { EthersError } from "../errors.js";
import { parseMrEnclave } from "../parseMrEnclave.js";
import type {
  EnclaveData,
  ISwitchboardProgram,
  RawMrEnclave,
  TransactionOptions,
  VerificationStatusType,
} from "../types.js";
import { VerificationStatus } from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { sleep } from "@switchboard-xyz/common";
import type { BigNumber, ContractTransaction } from "ethers";
import { Wallet } from "ethers";

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
  authority: string;
  // The address of the authority for the enclave
  signer: string;
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
   * @returns {Promise<LoadedEnclaveAccount>} Promise that resolves to tuple of EnclaveAccount and EnclaveData
   *
   * ```typescript
   * const enclaveAccount = await EnclaveAccount.load(switchboard, address);
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<LoadedEnclaveAccount> {
    const enclave = await switchboard.sb
      .enclaves(address)
      .catch(EthersError.handleError);
    return new LoadedEnclaveAccount(switchboard, address, enclave);
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
      [address, params.signer, params.attestationQueue, params.authority],
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
      [this.address],
      options
    );

    return tx;
  }

  public async heartbeat(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "enclaveHeartbeat",
      [this.address],
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
      [enclaveData.signer, enclaveData.queueId, parseMrEnclave(enclaveBuffer)],
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
   * const enclaveAccount = await EnclaveAccount.signerToAddress(switchboard, authority);
   * ```
   */
  public static async signerToAddress(
    switchboard: ISwitchboardProgram,
    authority: string
  ): Promise<EnclaveAccount> {
    const address = await switchboard.sb
      .enclaveSignerToEnclaveId(authority)
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
    const enclaveAccount = await EnclaveAccount.signerToAddress(
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

      if (enclave.verificationStatus !== VerificationStatus.SUCCESS) {
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
      verificationStatus !== VerificationStatus.SUCCESS &&
      verificationStatus !== VerificationStatus.OVERRIDE
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
          case VerificationStatus.SUCCESS:
          case VerificationStatus.OVERRIDE: {
            continuePoll = false;
            break;
          }
          case VerificationStatus.FAILURE: {
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

export class LoadedEnclaveAccount extends EnclaveAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string,
    public data: EnclaveData
  ) {
    super(switchboard, address);
  }

  public get account(): EnclaveAccount {
    return this;
  }

  /**
   * Load Function Account data and update LoadedFunctionAccount state.
   *
   * @returns {Promise<EnclaveData>} Promise that resolves to EnclaveData
   *
   * ```typescript
   * const functionData = await functionAccount.loadData();
   * ```
   */
  public async loadData(): Promise<EnclaveData> {
    this.data = await this.switchboard.sb
      .enclaves(this.address)
      .catch(EthersError.handleError);
    return this.data;
  }

  // signer
  public get signer(): string {
    return this.data.signer;
  }

  // authority
  public get authority(): string {
    return this.data.authority;
  }

  // queueId
  public get queueId(): string {
    return this.data.queueId;
  }

  // cid
  public get cid(): string {
    return this.data.cid;
  }

  // verificationStatus
  public get verificationStatus(): VerificationStatusType {
    switch (this.data.verificationStatus) {
      case 0:
        return "PENDING";
      case 1:
        return "FAILURE";
      case 2:
        return "SUCCESS";
      case 3:
        return "OVERRIDE";
      default:
        throw new Error(
          `Failed to get Enclave's verificationStatus from enum (${this.data.verificationStatus})`
        );
    }
  }

  // verificationTimestamp
  public get verificationTimestamp(): number {
    return this.data.verificationTimestamp.toNumber();
  }

  // validUntil
  public get validUntil(): number {
    return this.data.validUntil.toNumber();
  }

  // mrEnclave
  public get mrEnclave(): string {
    return this.data.mrEnclave;
  }

  // isOnQueue
  public get isOnQueue(): boolean {
    return this.data.isOnQueue;
  }

  // lastHeartbeat
  public get lastHeartbeat(): number {
    return this.data.lastHeartbeat.toNumber();
  }

  // balance
  public get balance(): BigNumber {
    return this.data.balance;
  }

  public toObj() {
    return this.toJSON();
  }

  public toJSON() {
    return {
      address: this.address,
      signer: this.signer,
      authority: this.authority,
      queueId: this.queueId,
      cid: this.cid,
      verificationStatus: this.verificationStatus,
      verificationTimestamp: this.verificationTimestamp,
      validUntil: this.validUntil,
      mrEnclave: this.mrEnclave,
      isOnQueue: this.isOnQueue,
      lastHeartbeat: this.lastHeartbeat,
      balance: this.balance,
    };
  }
}
