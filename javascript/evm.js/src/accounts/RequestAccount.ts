import { EthersError } from "../errors.js";
import type { RequestLib } from "../switchboard-types/hardhat-diamond-abi/HardhatDiamondABI.sol/Switchboard.js";
import type { FunctionStatusType } from "../types.js";
import {
  type ISwitchboardProgram,
  type RawMrEnclave,
  type RequestData,
  type TransactionOptions,
  type TransactionStruct,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import type { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { Wallet } from "ethers";

/**
 * Interface for the Request Account initialization parameters
 *
 */
export interface RequestInitParams {
  functionId: string;
  params?: string;
}

/**
 * Class for interacting with Request Accounts in the SwitchboardAttestationService.sol contract.
 *
 * ```typescript
 * // Instantiate an RequestAccount
 * const requestAccount = new RequestAccount(switchboardProgram, '0xYourRequestAccountAddress');
 *
 * // Load the data
 * const request = await requestAccount.loadData();
 * const name = request.name;
 * ```
 */
export class RequestAccount {
  /**
   * Constructor of RequestAccount
   * @param switchboard the instance of Switchboard program
   * @param address address of the RequestAccount
   */
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * Load Request Account data
   *
   * @returns {Promise<RequestData>} Promise that resolves to RequestData
   *
   * ```typescript
   * const requestData = await requestAccount.loadData();
   * ```
   */
  public async loadData(): Promise<RequestData> {
    return await this.switchboard.sb
      .requests(this.address)
      .catch(EthersError.handleError);
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {string} address - Address of the Request Account
   *
   * @returns {Promise<LoadedRequestAccount>} Promise that resolves to a LoadedRequestAccount class containing the current on-chain state of the request
   *
   * ```typescript
   * const [requestAccount, requestData] = await RequestAccount.load(switchboard, address);
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<LoadedRequestAccount> {
    const requestData = await switchboard.sb
      .requests(address)
      .catch(EthersError.handleError);
    return new LoadedRequestAccount(switchboard, address, requestData);
  }

  /**
   * Static method to initialize a Request Account
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {RequestInitParams & { attestationQueue: string }} params - Request initialization params
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<[RequestAccount, ContractTransaction]>} Promise that resolves to a tuple containing the RequestAccount and the ContractTransaction
   *
   * ```typescript
   * const [requestAccount, contractTransaction] = await RequestAccount.create(switchboard, params, options);
   * ```
   */
  public static async send(
    switchboard: ISwitchboardProgram,
    params: RequestInitParams,
    options?: TransactionOptions
  ): Promise<[RequestAccount, ContractTransaction]> {
    const address = Wallet.createRandom().address;
    const tx = await switchboard.sendSbTxn(
      "sendRequestWithId",
      [address, params.functionId, Buffer.from(params.params ?? "")],
      options
    );
    return [new RequestAccount(switchboard, address), tx];
  }

  /**
   * Fund the escrow of the Request Account
   *
   * @param fundAmount - The amount of ETH to deposit into a Request's escrow.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await requestAccount.escrowFund(100000);
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async requestFund(
    fundAmount: BigNumberish,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendSbTxn("requestFund", [this.address], {
      ...options,
      value: fundAmount,
    });
    return tx;
  }

  /**
   * Withdraw from the escrow of the Request Account
   *
   * @parm withdrawAmount - The amount of ETH to remove from a Request's escrow.
   * @parm withdrawAddress - The account to send the withdrawed funds to.
   * @param options - (Optional) Transaction options.
   *
   * ```typescript
   * const tx = await requestAccount.escrowWithdraw(100000, '0xMyWithdrawWallet');
   * ```
   *
   * @returns - The ContractTransaction.
   */
  public async requestEscrowWithdrawal(
    withdrawAmount: BigNumberish,
    withdrawAddress: string,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    // TODO: Check request authority == msg.sender
    // TODO: Check request has enough funds
    const tx = await this.switchboard.sendSbTxn(
      "requestWithdrawal",
      [this.address, withdrawAddress, withdrawAmount],
      options
    );
    return tx;
  }
}

export class LoadedRequestAccount extends RequestAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string,
    public data: RequestData
  ) {
    super(switchboard, address);
  }

  public get account(): RequestAccount {
    return this;
  }

  /**
   * Load Request Account data and update LoadedRequestAccount state.
   *
   * @returns {Promise<RequestData>} Promise that resolves to RequestData
   *
   * ```typescript
   * const requestData = await requestAccount.loadData();
   * ```
   */
  public async loadData(): Promise<RequestData> {
    this.data = await this.switchboard.sb
      .requests(this.address)
      .catch(EthersError.handleError);
    return this.data;
  }

  /** The name of the request. */
  public get functionId(): string {
    return this.data.functionId;
  }

  /** The authority of the request and is permitted to make account changes. */
  public get authority(): string {
    return this.data.authority;
  }

  public get executedAt(): BigNumber {
    return this.data.executedAt;
  }

  public get requestData(): string {
    return this.data.requestData;
  }

  public get executed(): boolean {
    return this.data.executed;
  }

  public get consecutiveFailures(): BigNumber {
    return this.data.consecutiveFailures;
  }

  public get balance(): BigNumber {
    return this.data.balance;
  }

  public get startAfter(): BigNumber {
    return this.data.startAfter;
  }

  public get errorCode(): number {
    return this.data.errorCode;
  }

  // [>* The status of the request. <]
  // public get status(): RequestStatusType {
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
  // `Failed to get Request's status from enum (${this.data.status})`
  // );
  // }
  // }

  /** The cron schedule of the request. */
  public toObj() {
    return this.toJSON();
  }

  public toJSON() {
    return {
      functionId: this.functionId,
      authority: this.authority,
      executedAt: this.executedAt,
      requestData: this.requestData,
      executed: this.executed,
      consecutiveFailures: this.consecutiveFailures,
      balance: this.balance,
      startAfter: this.startAfter,
      errorCode: this.errorCode,
    };
  }
}
