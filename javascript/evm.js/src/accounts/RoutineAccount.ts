import { EthersError } from "../errors.js";
import type { RoutineLib } from "../switchboard-types/hardhat-diamond-abi/HardhatDiamondABI.sol/Switchboard.js";
import type { FunctionStatusType } from "../types.js";
import {
  type ISwitchboardProgram,
  type RawMrEnclave,
  type RoutineData,
  type TransactionOptions,
  type TransactionStruct,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import type { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { Wallet } from "ethers";

/**
 * Interface for the Routine Account initialization parameters
 */
export interface RoutineInitParams {
  authority: string;
  schedule: string;
  params?: string;
  functionId: string;
}

/**
 * Class for interacting with Routine Accounts in the SwitchboardAttestationService.sol contract.
 *
 * ```typescript
 * // Instantiate an RoutineAccount
 * const routineAccount = new RoutineAccount(switchboardProgram, '0xYourRoutineAccountAddress');
 *
 * // Load the data
 * const routine = await routineAccount.loadData();
 * const name = routine.name;
 * ```
 */
export class RoutineAccount {
  /**
   * Constructor of RoutineAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the RoutineAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Load Routine Account data
   *
   * @returns {Promise<RoutineData>} Promise that resolves to RoutineData
   *
   * ```typescript
   * const routineData = await routineAccount.loadData();
   * ```
   */
  public async loadData(): Promise<RoutineData> {
    return await this.switchboard.sb
      .routines(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {string} address - Address of the Routine Account
   *
   * @returns {Promise<LoadedRoutineAccount>} Promise that resolves to a LoadedRoutineAccount class containing the current on-chain state of the routine
   *
   * ```typescript
   * const [routineAccount, routineData] = await RoutineAccount.load(switchboard, address);
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<LoadedRoutineAccount> {
    const routineData = await switchboard.sb
      .routines(address)
      .catch(EthersError.handleError);
    return new LoadedRoutineAccount(switchboard, address, routineData);
  }

  /**
   * Static method to initialize a Routine Account
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {RoutineInitParams} params - Routine initialization params
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<[RoutineAccount, ContractTransaction]>} Promise that resolves to a tuple containing the RoutineAccount and the ContractTransaction
   *
   * ```typescript
   * const [routineAccount, contractTransaction] = await RoutineAccount.create(switchboard, params, options);
   * ```
   */
  public static async create(
    switchboard: ISwitchboardProgram,
    params: RoutineInitParams,
    options?: TransactionOptions
  ): Promise<[RoutineAccount, ContractTransaction]> {
    const routineAddress = Wallet.createRandom().address;

    const tx = await switchboard.sendSbTxn(
      "createRoutineWithId",
      [
        routineAddress,
        params.functionId,
        params.authority,
        Buffer.from(params.params ?? ""),
        params.schedule,
      ],
      options
    );
    return [new RoutineAccount(switchboard, routineAddress), tx];
  }

  /**
   * Fund the escrow of the Routine Account
   *
   * @param fundAmount - The amount of ETH to deposit into a Routine's escrow.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await routineAccount.escrowFund(100000);
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowFund(
    fundAmount: BigNumberish,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn(
      "routineEscrowFund",
      [this.address],
      {
        ...options,
        value: fundAmount,
      }
    );
    return tx;
  }

  /**
   * Withdraw from the escrow of the Routine Account
   *
   * @parm withdrawAmount - The amount of ETH to remove from a Routine's escrow.
   * @parm withdrawAddress - The account to send the withdrawed funds to.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await routineAccount.escrowWithdraw(100000, '0xMyWithdrawWallet');
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async escrowWithdraw(
    withdrawAmount: BigNumberish,
    withdrawAddress: string,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO: Check routine authority == msg.sender
    // TODO: Check routine has enough funds
    const tx = await this.switchboard.sendSbTxn(
      "routineEscrowWithdraw",
      [withdrawAddress, this.address, withdrawAmount],
      options
    );
    return tx;
  }

  public async configure(
    configs: {
      name?: string;
      authority?: string;
      version?: string;
      schedule?: string;
      params?: string;
    },
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const routineData = await this.loadData();
    const authority = configs.authority ?? routineData.authority;
    const schedule = configs.schedule ?? routineData.schedule;
    const params = configs.params ?? routineData.params;
    const tx = await this.switchboard.sendSbTxn(
      "updateRoutine",
      [this.address, routineData.functionId, authority, params, schedule],
      options
    );
    return tx;
  }
}

export class LoadedRoutineAccount extends RoutineAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string,
    public data: RoutineData
  ) {
    super(switchboard, address);
  }

  public get account(): RoutineAccount {
    return this;
  }

  /**
   * Load Routine Account data and update LoadedRoutineAccount state.
   *
   * @returns {Promise<RoutineData>} Promise that resolves to RoutineData
   *
   * ```typescript
   * const routineData = await routineAccount.loadData();
   * ```
   */
  public async loadData(): Promise<RoutineData> {
    this.data = await this.switchboard.sb
      .routines(this.address)
      .catch(EthersError.handleError);
    return this.data;
  }

  /** The name of the routine. */
  public get functionId(): string {
    return this.data.functionId;
  }

  /** The authority of the routine and is permitted to make account changes. */
  public get authority(): string {
    return this.data.authority;
  }

  public get schedule(): string {
    return this.data.schedule;
  }

  public get params(): string {
    return this.data.params;
  }

  public get lastCalledAt(): BigNumber {
    return this.data.lastCalledAt;
  }

  public get consecutiveFailures(): BigNumber {
    return this.data.consecutiveFailures;
  }

  public get balance(): BigNumber {
    return this.data.balance;
  }

  // [>* The status of the routine. <]
  // public get status(): RoutineStatusType {
  // switch (this.data.status) {
  // case 0:
  // return "NONE";
  // case 1:
  // return "ACTIVE";
  // case 2:
  // return "NON_EXECUTABLE";
  // case 3:
  // return "EXPIRED";
  // case 4:
  // return "OUT_OF_FUNDS";
  // case 5:
  // return "INVALID_PERMISSIONS";
  // case 6:
  // return "DEACTIVATED";
  // default:
  // throw new Error(
  // `Failed to get Routine's status from enum (${this.data.status})`
  // );
  // }
  // }

  /** The cron schedule of the routine. */
  public get errorCode(): number {
    return this.data.errorCode;
  }
  public toObj() {
    return this.toJSON();
  }

  public toJSON() {
    return {
      functionId: this.functionId,
      authority: this.authority,
      schedule: this.schedule,
      params: this.params,
      lastCalledAt: this.lastCalledAt,
      consecutiveFailures: this.consecutiveFailures,
      balance: this.balance,
      // status
      errorCode: this.errorCode,
    };
  }
}
