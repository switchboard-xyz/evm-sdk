import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  FunctionData,
  ISwitchboardProgram,
  RawMrEnclave,
  TransactionOptions,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { BigNumberish, ContractTransaction } from "ethers";

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
  delegatedSignerAddress: string;
  observedTime: number;
  nextAllowedTimestamp: number;
  isFailure: boolean;
  mrEnclave: RawMrEnclave;
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
    return await this.switchboard.vs.funcs(this.address);
  }

  /**
   * Static method to load and fetch the account data
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {string} address - Address of the Function Account
   *
   * @returns {Promise<[FunctionAccount, FunctionData]>} Promise that resolves to a tuple containing the FunctionAccount and the FunctionData
   *
   * ```typescript
   * const [functionAccount, functionData] = await FunctionAccount.load(switchboard, address);
   * ```
   */
  public static async load(
    switchboard: ISwitchboardProgram,
    address: string
  ): Promise<[FunctionAccount, FunctionData]> {
    const functionAccount = new FunctionAccount(switchboard, address);
    const functionData = await functionAccount.loadData();
    return [functionAccount, functionData];
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
    const queueData = await attestationQueue.loadData();

    const tx = await switchboard.sendVsTxn(
      "createFunction",
      [
        params.authority,
        params.name,
        params.containerRegistry,
        params.container,
        params.schedule,
        params.version,
        attestationQueue.address,
      ],
      options
    );
    const functionAddress = await switchboard.pollTxnForVsEvent(
      tx,
      "accountAddress"
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
   */
  public async verify(
    params: FunctionVerifyParams,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await this.switchboard.sendVsTxn(
      "verifyFunction",
      [
        this.address,
        params.delegatedSignerAddress,
        params.observedTime,
        params.nextAllowedTimestamp,
        params.isFailure,
        params.mrEnclave,
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
    const tx = await this.switchboard.sendVsTxn("escrowFund", [this.address], {
      ...options,
      value: fundAmount,
    });
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
      "escrowWithdraw",
      [withdrawAddress, this.address, withdrawAmount],
      options
    );
    return tx;
  }
}
