import { EthersError } from "../errors.js";
import { parseMrEnclave } from "../parseMrEnclave.js";
import type {
  AttestationQueueData,
  CreateEnclave,
  CreateFunction,
  EnablePermissions,
  ISwitchboardProgram,
  RawMrEnclave,
  TransactionOptions,
} from "../types.js";
import { PermissionStatus } from "../types.js";
import { getAuthoritySigner, getQueueSigner } from "../utils.js";

import { EnclaveAccount } from "./EnclaveAccount.js";
import { FunctionAccount } from "./FunctionAccount.js";
import { Permissions } from "./Permissions.js";

import type { BigNumber, ContractTransaction } from "ethers";

/**
 * Parameters to initialize an {AttestationQueueAccount}.
 *
 * ```typescript
 * const params: AttestationQueueInitParams = {
 *   authority: 'authority_string',
 *   maxSize: 10,
 *   reward: 50,
 *   enclaveTimeout: 60000,
 *   maxEnclaveVerificationAge: 3600000,
 *   allowAuthorityOverrideAfter: 7200000,
 *   requireAuthorityHeartbeatPermission: true,
 *   requireUsagePermissions: false
 * };
 * ```
 */
export interface AttestationQueueInitParams {
  // The authority for the attestation queue.
  authority: string;
  // The maximum size of the attestation queue.
  maxSize: number;
  // The reward for providing attestations.
  reward: number;
  // The timeout for enclaves in the attestation queue.
  enclaveTimeout: number;
  // The maximum age of a enclave for it to be valid.
  maxEnclaveVerificationAge: number;
  // The amount of time after which the authority can be overridden.
  allowAuthorityOverrideAfter: number;
  // If true, requires authority's heartbeat permission.
  requireAuthorityHeartbeatPermission: boolean;
  // If true, requires usage permissions.
  requireUsagePermissions: boolean;
  // Number of tolerated function failures before labeling it non-executable
  maxConsecutiveFunctionFailures: number;
}

/**
 * A partial version of {@link AttestationQueueInitParams}
 *
 * ```typescript
 * const setConfigsParams: AttestationQueueSetConfigsParams = {
 *   maxSize: 15,
 *   reward: 100
 * };
 * ```
 */
export type AttestationQueueSetConfigsParams =
  Partial<AttestationQueueInitParams>;

/**
 * Represents an Attestation Queue Account in the SwitchboardAttestationService.sol contract.
 *
 * ```typescript
 * // Instantiate an AttestationQueueAccount
 * const attestationQueueAccount = new AttestationQueueAccount(switchboardProgram, '0xYourAttestationQueueAddress');
 *
 * // Load the data
 * const attestationQueue = await attestationQueueAccount.loadData();
 * const name = attestationQueue.name;
 * ```
 */
export class AttestationQueueAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Method to load AttestationQueueData
   *
   * @returns {Promise<AttestationQueueData>} Promise that resolves to AttestationQueueData
   *
   * ```typescript
   * const data = await attestationQueueAccount.loadData();
   * ```
   */
  public async loadData(): Promise<AttestationQueueData> {
    return await this.switchboard.sb
      .attestationQueues(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Method to load and fetch the account data
   *
   * @param switchboard - The switchboard program instance
   * @param address - The account address
   *
   * @returns {Promise<LoadedAttestationQueueAccount>} Promise that resolves to a tuple with AttestationQueueAccount and AttestationQueueData
   *
   * ```typescript
   * const [account, data] = await AttestationQueueAccount.load(switchboardProgram, 'account_address');
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<LoadedAttestationQueueAccount> {
    const attestationQueue = await switchboard.sb
      .attestationQueues(address)
      .catch(EthersError.handleError);
    return new LoadedAttestationQueueAccount(
      switchboard,
      address,
      attestationQueue
    );
  }

  /**
   * Method to initialize an AttestationQueueAccount
   *
   * @param switchboard - The switchboard program instance
   * @param params - Initialization parameters
   * @param [options] - Transaction options
   *
   * @returns {Promise<[AttestationQueueAccount, ContractTransaction]>} Promise that resolves to a tuple with AttestationQueueAccount and ContractTransaction
   *
   * ```typescript
   * const [account, transaction] = await AttestationQueueAccount.init(switchboardProgram, params, options);
   * ```
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: AttestationQueueInitParams,
    options?: TransactionOptions
  ): Promise<[AttestationQueueAccount, ContractTransaction]> {
    const tx = await switchboard.sendSbTxn(
      "createAttestationQueue",
      [
        params.authority,
        params.maxSize,
        params.reward,
        params.enclaveTimeout,
        params.maxEnclaveVerificationAge,
        params.allowAuthorityOverrideAfter,
        params.requireAuthorityHeartbeatPermission,
        params.requireUsagePermissions,
        params.maxConsecutiveFunctionFailures,
      ],
      options
    );
    const queueId = await switchboard.pollTxnForSbEvent(tx, "accountId");
    return [new AttestationQueueAccount(switchboard, queueId), tx];
  }

  /**
   * Method to set configuration for the AttestationQueueAccount
   *
   * @param params - Configuration parameters
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * ```typescript
   * const transaction = await attestationQueueAccount.setConfigs(params, options);
   * ```
   */
  public async setConfigs(
    params: AttestationQueueSetConfigsParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const queue = await this.loadData();

    const tx = await this.switchboard.sendSbTxn(
      "setAttestationQueueConfig",
      [
        this.address,
        params.authority ?? queue.authority,
        params.maxSize ?? queue.maxSize,
        params.reward ?? queue.reward,
        params.enclaveTimeout ?? queue.enclaveTimeout,
        params.maxEnclaveVerificationAge ?? queue.maxEnclaveVerificationAge,
        params.allowAuthorityOverrideAfter ?? queue.allowAuthorityOverrideAfter,
        params.requireAuthorityHeartbeatPermission
          ? params.requireAuthorityHeartbeatPermission
          : queue.requireAuthorityHeartbeatPermission,
        params.requireUsagePermissions
          ? params.requireUsagePermissions
          : queue.requireUsagePermissions,
        params.maxConsecutiveFunctionFailures,
      ],
      options
    );
    return tx;
  }

  /**
   * Method to check if the MrEnclave exists
   *
   * @param mrEnclave - The MrEnclave instance to check
   *
   * @returns {Promise<boolean>} Promise that resolves to a boolean indicating whether the MrEnclave exists
   *
   * ```typescript
   * const hasEnclave = await attestationQueueAccount.hasMrEnclave(rawMrEnclave);
   * ```
   */
  public async hasMrEnclave(mrEnclave: RawMrEnclave): Promise<boolean> {
    return await this.switchboard.sb
      .attestationQueueHasMrEnclave(this.address, parseMrEnclave(mrEnclave))
      .catch(EthersError.handleError);
  }

  /**
   * Method to add a new MrEnclave
   *
   * @param mrEnclave - The MrEnclave instance to add
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * ```typescript
   * const transaction = await attestationQueueAccount.addMrEnclave(rawMrEnclave, options);
   * ```
   */
  public async addMrEnclave(
    mrEnclave: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "addMrEnclaveToAttestationQueue",
      [this.address, mrEnclave],
      options
    );
    return tx;
  }

  /**
   * Method to remove an existing MrEnclave
   *
   * @param mrEnclave - The MrEnclave instance to remove
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to ContractTransaction
   *
   * ```typescript
   * const transaction = await attestationQueueAccount.removeMrEnclave(rawMrEnclave, options);
   * ```
   */
  public async removeMrEnclave(
    mrEnclave: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "removeMrEnclaveFromAttestationQueue",
      [this.address, mrEnclave],
      options
    );
    return tx;
  }

  /**
   * Method to create a FunctionAccount and optionally enable its serviceQueue permissions
   *
   * @param params - Parameters required to create the function
   * @param [enable=true] - Flag to enable serviceQueue permissions (default is true)
   * @param [options] - Transaction options
   *
   * @returns {Promise<FunctionAccount>} Promise that resolves to FunctionAccount
   *
   * ```typescript
   * const functionAccount = await attestationQueueAccount.createFunction(createFunctionParams, true, options);
   * ```
   */
  public async createFunction(
    params: CreateFunction,
    enable: EnablePermissions = true,
    options?: TransactionOptions
  ): Promise<FunctionAccount> {
    // verify it exists
    await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [functionAccount] = await FunctionAccount.create(
      switchboard,
      {
        ...params,
        authority: authority,
        attestationQueue: this.address,
      },
      { ...options, signer: authoritySigner }
    );

    if (
      typeof enable === "boolean" ? enable : enable.queueAuthority !== undefined
    ) {
      const setPermTx = await Permissions.set(
        this.switchboard,
        this,
        functionAccount.address,
        PermissionStatus.PERMIT_ATTESTATION_QUEUE_USAGE,
        true,
        {
          ...options,
          signer: getQueueSigner(enable),
        }
      );

      await setPermTx.wait();
    }

    return functionAccount;
  }

  /**
   * Method to create a {EnclaveAccount} and optionally enable its serviceQueue permissions
   *
   * @param params - Parameters required to create the enclave
   * @param [options] - Transaction options
   *
   * @returns {Promise<EnclaveAccount>} Promise that resolves to EnclaveAccount
   *
   * ```typescript
   * const enclaveAccount = await attestationQueueAccount.createEnclave(createEnclaveParams, options);
   * ```
   */
  public async createEnclave(
    params: CreateEnclave,
    options?: TransactionOptions
  ): Promise<EnclaveAccount> {
    // verify it exists
    await this.loadData();

    const [switchboard, authority, authoritySigner] = await getAuthoritySigner(
      this.switchboard,
      params
    );

    const [enclaveAccount] = await EnclaveAccount.create(
      switchboard,
      {
        ...params,
        authority: authority,
        attestationQueue: this.address,
      },
      { ...options, signer: authoritySigner }
    );

    return enclaveAccount;
  }
}

export class LoadedAttestationQueueAccount extends AttestationQueueAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string,
    public data: AttestationQueueData
  ) {
    super(switchboard, address);
  }

  public get account(): AttestationQueueAccount {
    return this;
  }

  /**
   * Load Function Account data and update LoadedFunctionAccount state.
   *
   * @returns {Promise<AttestationQueueData>} Promise that resolves to AttestationQueueData
   *
   * ```typescript
   * const functionData = await functionAccount.loadData();
   * ```
   */
  public async loadData(): Promise<AttestationQueueData> {
    this.data = await this.switchboard.sb
      .attestationQueues(this.address)
      .catch(EthersError.handleError);
    return this.data;
  }

  // authority
  public get authority(): string {
    return this.data.authority;
  }

  // verifier oracles
  public get verifiers(): string[] {
    return this.data.data;
  }

  // maxSize
  public get maxSize(): number {
    return this.data.maxSize.toNumber();
  }

  // reward
  public get reward(): BigNumber {
    return this.data.reward;
  }

  // lastHeartbeat
  public get lastHeartbeat(): number {
    return this.data.lastHeartbeat.toNumber();
  }

  // mrEnclaves
  public get mrEnclaves(): string[] {
    return this.data.mrEnclaves;
  }

  // maxEnclaveVerificationAge
  public get maxEnclaveVerificationAge(): number {
    return this.data.maxEnclaveVerificationAge.toNumber();
  }

  // allowAuthorityOverrideAfter
  public get allowAuthorityOverrideAfter(): number {
    return this.data.allowAuthorityOverrideAfter.toNumber();
  }

  // maxConsecutiveFunctionFailures
  public get maxConsecutiveFunctionFailures(): number {
    return this.data.maxConsecutiveFunctionFailures.toNumber();
  }

  // requireAuthorityHeartbeatPermission
  public get requireAuthorityHeartbeatPermission(): boolean {
    return this.data.requireAuthorityHeartbeatPermission;
  }

  // requireUsagePermissions
  public get requireUsagePermissions(): boolean {
    return this.data.requireUsagePermissions;
  }

  // enclaveTimeout
  public get enclaveTimeout(): number {
    return this.data.enclaveTimeout.toNumber();
  }

  // gcIdx
  public get gcIdx(): number {
    return this.data.gcIdx.toNumber();
  }

  // currIdx
  public get currIdx(): number {
    return this.data.currIdx.toNumber();
  }

  public toObj() {
    return this.toJSON();
  }

  public toJSON() {
    return {
      address: this.address,
      authority: this.authority,
      verifiers: this.verifiers,
      maxSize: this.maxSize,
      reward: this.reward,
      lastHeartbeat: this.lastHeartbeat,
      mrEnclaves: this.mrEnclaves,
      maxEnclaveVerificationAge: this.maxEnclaveVerificationAge,
      allowAuthorityOverrideAfter: this.allowAuthorityOverrideAfter,
      maxConsecutiveFunctionFailures: this.maxConsecutiveFunctionFailures,
      requireAuthorityHeartbeatPermission:
        this.requireAuthorityHeartbeatPermission,
      requireUsagePermissions: this.requireUsagePermissions,
      enclaveTimeout: this.enclaveTimeout,
      gcIdx: this.gcIdx,
      currIdx: this.currIdx,
    };
  }
}
