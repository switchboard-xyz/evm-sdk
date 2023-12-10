import { EthersError } from "../errors.js";
import type { FunctionLib } from "../switchboard-types/hardhat-diamond-abi/HardhatDiamondABI.sol/Switchboard.js";
import type { FunctionStatusType } from "../types.js";
import {
  type FunctionData,
  type ISwitchboardProgram,
  type RawMrEnclave,
  type RequestData,
  type RoutineData,
  type TransactionOptions,
  type TransactionStruct,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";
import { RequestAccount } from "./RequestAccount.js";
import { RoutineAccount } from "./RoutineAccount.js";

import type { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { Wallet } from "ethers";

/**
 * Interface for the Function Account initialization parameters
 *
 * ```typescript
 * {
 *   authority: '0xMyAuthority',
 *   name: 'my function',
 *   containerRegistry: 'https://container_registry.com',
 *   container: 'container-id',
 *   schedule: '* * * * *',
 *   version: '1'
 * }
 * ```
 */
export interface FunctionInitParams {
  authority: string;
  name: string;
  containerRegistry: string;
  container: string;
  schedule: string;
  version: string;
  paramSchema?: string;
  permittedCallers?: string[];
  functionId?: string;
}

/**
 * Interface to verify a FunctionAccount
 *
 * ```typescript
 * {
 *   delegatedSignerAddress: '0xMyDelegatedSigner',
 *   observedTime: 1337,
 *   nextAllowedTimestamp: 13337,
 *   isFailure: false,
 *   mrEnclave: [0,0,0,0,0]
 * }
 * ```
 */
export interface FunctionVerifyParams {
  verifierQuoteId: string;
  delegatedSignerAddress: string;
  observedTime: number;
  nextAllowedTimestamp: number;
  isFailure: boolean;
  mrEnclave: RawMrEnclave;
  transactions: TransactionStruct[];
  signatures: string[];
}

/**
 * Class for interacting with Function Accounts in the SwitchboardAttestationService.sol contract.
 *
 * ```typescript
 * // Instantiate an FunctionAccount
 * const functionAccount = new FunctionAccount(switchboardProgram, '0xYourFunctionAccountAddress');
 *
 * // Load the data
 * const function = await functionAccount.loadData();
 * const name = function.name;
 * ```
 */
export class FunctionAccount {
  /**
   * Constructor of FunctionAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the FunctionAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Load Function Account data
   *
   * @returns {Promise<FunctionData>} Promise that resolves to FunctionData
   *
   * ```typescript
   * const functionData = await functionAccount.loadData();
   * ```
   */
  public async loadData(): Promise<FunctionData> {
    return await this.switchboard.sb
      .funcs(this.address)
      .catch(EthersError.handleError);
  }

  public async loadAllRequests(): Promise<
    Array<[RequestAccount, RequestData]>
  > {
    const routines = await this.switchboard.sb
      .getRequestsByFunctionId(this.address)
      .catch(EthersError.handleError);
    const out: Array<[RequestAccount, RequestData]> = [];
    for (let i = 0; i < routines[0].length; i++) {
      out.push([
        new RequestAccount(this.switchboard, routines[0][i]),
        routines[1][i],
      ]);
    }
    return out;
  }

  public async loadAllRoutines(): Promise<
    Array<[RoutineAccount, RoutineData]>
  > {
    const routines = await this.switchboard.sb
      .getRoutinesByFunctionId(this.address)
      .catch(EthersError.handleError);
    const out: Array<[RoutineAccount, RoutineData]> = [];
    for (let i = 0; i < routines[0].length; i++) {
      out.push([
        new RoutineAccount(this.switchboard, routines[0][i]),
        routines[1][i],
      ]);
    }
    return out;
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {string} address - Address of the Function Account
   *
   * @returns {Promise<LoadedFunctionAccount>} Promise that resolves to a LoadedFunctionAccount class containing the current on-chain state of the function
   *
   * ```typescript
   * const [functionAccount, functionData] = await FunctionAccount.load(switchboard, address);
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<LoadedFunctionAccount> {
    const functionData = await switchboard.sb
      .funcs(address)
      .catch(EthersError.handleError);
    return new LoadedFunctionAccount(switchboard, address, functionData);
  }

  /**
   * Static method to initialize a Function Account
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {FunctionInitParams & { attestationQueue: string }} params - Function initialization params
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<[FunctionAccount, ContractTransaction]>} Promise that resolves to a tuple containing the FunctionAccount and the ContractTransaction
   *
   * ```typescript
   * const [functionAccount, contractTransaction] = await FunctionAccount.create(switchboard, params, options);
   * ```
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: FunctionInitParams & { attestationQueue: string },
    options?: TransactionOptions
  ): Promise<[FunctionAccount, ContractTransaction]> {
    // load queue to make sure it exists
    const attestationQueue = new AttestationQueueAccount(
      switchboard,
      params.attestationQueue
    );
    await attestationQueue.loadData();

    const functionAddress = params.functionId ?? Wallet.createRandom().address;

    const tx = await switchboard.sendSbTxn(
      "createFunctionWithId",
      [
        functionAddress,
        params.name,
        params.authority,
        attestationQueue.address,
        params.containerRegistry,
        params.container,
        params.version,
        params.schedule,
        params.paramSchema ?? "",
        params.permittedCallers || [],
      ],
      options
    );
    return [new FunctionAccount(switchboard, functionAddress), tx];
  }

  /**
   * Verify the Function Account
   *
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<boolean>} Promise that resolves to a boolean indicating whether the verification was successful
   *
   * ```typescript
   * const isVerified = await functionAccount.verify(options);
   * ```
   *
   *
   */
  public async verify(
    params: FunctionVerifyParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const idx = await this.switchboard.sb.getEnclaveIdx(params.verifierQuoteId);
    const tx = await this.switchboard.sendSbTxn(
      "functionVerify",
      [
        idx,
        this.address,
        params.delegatedSignerAddress,
        params.observedTime,
        params.nextAllowedTimestamp,
        params.isFailure,
        params.mrEnclave,
        params.transactions,
        params.signatures, // TODO: add signatures
      ],
      options
    );
    return tx;
  }

  /**
   * Fund the escrow of the Function Account
   *
   * @param fundAmount - The amount of ETH to deposit into a Function's escrow.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await functionAccount.escrowFund(100000);
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowFund(
    fundAmount: BigNumberish,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "functionEscrowFund",
      [this.address],
      {
        ...options,
        value: fundAmount,
      }
    );
    return tx;
  }

  /**
   * Withdraw from the escrow of the Function Account
   *
   * @parm withdrawAmount - The amount of ETH to remove from a Function's escrow.
   * @parm withdrawAddress - The account to send the withdrawed funds to.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await functionAccount.escrowWithdraw(100000, '0xMyWithdrawWallet');
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowWithdraw(
    withdrawAmount: BigNumberish,
    withdrawAddress: string,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO: Check function authority == msg.sender
    // TODO: Check function has enough funds
    const tx = await this.switchboard.sendSbTxn(
      "functionEscrowWithdraw",
      [withdrawAddress, this.address, withdrawAmount],
      options
    );
    return tx;
  }

  /**
   * addMrEnclave
   * @param mrEnclave - The mrEnclave to add to the function
   * @param options - (Optional) Transaction options.
   * @returns - The ContractTransaction.
   */
  public async addMrEnclave(
    mrEnclave: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "addMrEnclaveToFunction",
      [this.address, mrEnclave],
      options
    );
    return tx;
  }

  /**
   * removeMrEnclave
   * @param mrEnclave - The mrEnclave to remove from the function
   * @param options - (Optional) Transaction options.
   * @returns - The ContractTransaction.
   */
  public async removeMrEnclave(
    mrEnclave: RawMrEnclave,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "removeMrEnclaveFromFunction",
      [this.address, mrEnclave],
      options
    );
    return tx;
  }

  /**
   * setDeactivated
   * @param options - (Optional) Transaction options.
   * @returns - The ContractTransaction.
   */
  public async setDeactivated(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "setFunctionDeactivated",
      [this.address],
      options
    );
    return tx;
  }

  public async configure(
    configs: {
      name?: string;
      authority?: string;
      containerRegistry?: string;
      container?: string;
      version?: string;
      schedule?: string;
      paramsSchema?: string;
      permittedCallers?: string[];
    },
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const fnData = await this.loadData();
    const name = configs.name ?? fnData.name;
    const authority = configs.authority ?? fnData.authority;
    const containerRegistry =
      configs.containerRegistry ?? fnData.config.containerRegistry;
    const container = configs.container ?? fnData.config.container;
    const version = configs.version ?? fnData.config.version;
    const schedule = configs.schedule ?? fnData.config.schedule;
    const paramsSchema = configs.paramsSchema ?? fnData.config.paramsSchema;
    const permittedCallers =
      configs.permittedCallers ?? fnData.config.permittedCallers;
    const tx = await this.switchboard.sendSbTxn(
      "setFunctionConfig",
      [
        this.address,
        name,
        authority,
        containerRegistry,
        container,
        version,
        schedule,
        paramsSchema,
        permittedCallers,
      ],
      options
    );
    return tx;
  }
}

export class LoadedFunctionAccount extends FunctionAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string,
    public data: FunctionData
  ) {
    super(switchboard, address);
  }

  public get account(): FunctionAccount {
    return this;
  }

  /**
   * Load Function Account data and update LoadedFunctionAccount state.
   *
   * @returns {Promise<FunctionData>} Promise that resolves to FunctionData
   *
   * ```typescript
   * const functionData = await functionAccount.loadData();
   * ```
   */
  public async loadData(): Promise<FunctionData> {
    this.data = await this.switchboard.sb
      .funcs(this.address)
      .catch(EthersError.handleError);
    return this.data;
  }

  /** The name of the function. */
  public get name(): string {
    return this.data.name;
  }

  /** The authority of the function and is permitted to make account changes. */
  public get authority(): string {
    return this.data.authority;
  }

  public get enclaveId(): string {
    return this.data.enclaveId;
  }

  /** The address of the attestation queue that the function belongs to. */
  public get queueId(): string {
    return this.data.queueId;
  }

  /** The current balance of the function. Used to reward verifier oracles
   * for fulfilling updates.
   */
  public get balance(): BigNumber {
    return this.data.balance;
  }

  /** The status of the function. */
  public get status(): FunctionStatusType {
    switch (this.data.status) {
      case 0:
        return "NONE";
      case 1:
        return "ACTIVE";
      case 2:
        return "NON_EXECUTABLE";
      case 3:
        return "EXPIRED";
      case 4:
        return "OUT_OF_FUNDS";
      case 5:
        return "INVALID_PERMISSIONS";
      case 6:
        return "DEACTIVATED";
      default:
        throw new Error(
          `Failed to get Function's status from enum (${this.data.status})`
        );
    }
  }

  public get config(): FunctionLib.FunctionConfigStructOutput {
    return this.data.config;
  }

  /** The cron schedule of the function. */
  public get schedule(): string {
    return this.config.schedule;
  }

  public get permittedCallers(): string[] {
    return this.config.permittedCallers;
  }

  /** The container registry of the function. */
  public get containerRegistry(): string {
    return this.config.containerRegistry;
  }

  /** The name of the container in the registry. */
  public get container(): string {
    return this.config.container;
  }

  /** The version of the container in the registry. */
  public get version(): string {
    return this.config.version;
  }

  public get paramsSchema(): string {
    return this.config.paramsSchema;
  }

  /** The list of permitted MRENCLAVE measurements that are allowed to be
   * executed for this function. You will need to update this config value
   * each time the container is updated.
   * */
  public get mrEnclaves(): string[] {
    return this.config.mrEnclaves;
  }

  public get allowAllFnCalls(): boolean {
    return this.config.allowAllFnCalls;
  }

  public get useFnCallEscrow(): boolean {
    return this.config.useFnCallEscrow;
  }

  public get state(): FunctionLib.FunctionStateStructOutput {
    return this.data.state;
  }

  /** Number of consecutive failures for the function. */
  public get consecutiveFailures(): number {
    return this.state.consecutiveFailures.toNumber();
  }

  /** Unix timestamp when the function was last executed. */
  public get lastExecutionTimestamp(): number {
    return this.state.lastExecutionTimestamp.toNumber();
  }

  /** Unix timestamp when the function is next allowed to execute. */
  public get nextAllowedTimestamp(): number {
    return this.state.nextAllowedTimestamp.toNumber();
  }

  /** The amount of gas consumed in the previous function execution. */
  public get lastExecutionGasCost(): BigNumber {
    return this.state.lastExecutionGasCost;
  }

  /** Unix timestamp since the function was triggered and hasn't been fulfilled yet. */
  public get triggeredSince(): number {
    return this.state.triggeredSince.toNumber();
  }

  /** Number of active triggers for the function. */
  public get triggerCount(): number {
    return this.state.triggerCount.toNumber();
  }

  /** Current idx of the function on the attestation queue. Used to increment over
   * the queue's verifier oracles to prevent collusion.
   */
  public get queueIdx(): number {
    return this.state.queueIdx.toNumber();
  }

  /** Whether the function has been triggered for a request. */
  public get triggered(): boolean {
    return this.state.triggered;
  }

  /** Unix timestamp when the function was created. */
  public get createdAt(): number {
    return this.state.createdAt.toNumber();
  }

  public toObj() {
    return this.toJSON();
  }

  public toJSON() {
    return {
      address: this.address,
      name: this.name,
      authority: this.authority,
      enclaveId: this.enclaveId,
      queueId: this.queueId,
      queueIdx: this.queueIdx,
      balance: this.balance,
      status: this.status,
      permittedCallers: this.permittedCallers,
      schedule: this.schedule,
      containerRegistry: this.containerRegistry,
      container: this.container,
      version: this.version,
      nextAllowedTimestamp: this.nextAllowedTimestamp,
      lastExecutionTimestamp: this.lastExecutionTimestamp,
      lastExecutionGasCost: this.lastExecutionGasCost,
      consecutiveFailures: this.consecutiveFailures,
      triggered: this.triggered,
      triggerCount: this.triggerCount,
      triggeredSince: this.triggeredSince,
      paramsSchema: this.paramsSchema,
      mrEnclaves: this.mrEnclaves,
    };
  }
}
