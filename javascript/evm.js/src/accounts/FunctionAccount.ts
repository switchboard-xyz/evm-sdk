import { SwitchboardProgram } from "../SwitchboardProgram.js";
import {
  FunctionData,
  ISwitchboardProgram,
  TransactionOptions,
} from "../types.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

import { ContractTransaction } from "ethers";

/**
 * @interface FunctionInitParams
 * @description Interface for the Function Account initialization parameters
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
 * @class FunctionAccount
 * @description Class for interacting with Function Accounts in the {@linkcode SwitchboardAttestationService} contract.
 *
 * @example
 * ```typescript
 * const functionAccount = new FunctionAccount(switchboardProgram, '0xYourFunctionAccountAddress');
 * ```
 */
export class FunctionAccount {
  constructor(
    readonly switchboard: ISwitchboardProgram,
    readonly address: string
  ) {}

  /**
   * @async
   * @function loadData
   * @description Load Function Account data
   *
   * @returns {Promise<FunctionData>} Promise that resolves to FunctionData
   *
   * @example
   * const functionData = await functionAccount.loadData();
   */
  public async loadData(): Promise<FunctionData> {
    return await this.switchboard.vs.funcs(this.address);
  }

  /**
   * @async
   * @function load
   * @description Static method to load and fetch the account data
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {string} address - Address of the Function Account
   *
   * @returns {Promise<[FunctionAccount, FunctionData]>} Promise that resolves to a tuple containing the FunctionAccount and the FunctionData
   *
   * @example
   * const [functionAccount, functionData] = await FunctionAccount.load(switchboard, address);
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
   * @async
   * @function init
   * @description Static method to initialize a Function Account
   *
   * @param {ISwitchboardProgram} switchboard - Instance of the Switchboard Program class
   * @param {FunctionInitParams & { attestationQueue: string }} params - Function initialization params
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<[FunctionAccount, ContractTransaction]>} Promise that resolves to a tuple containing the FunctionAccount and the ContractTransaction
   *
   * @example
   * const [functionAccount, contractTransaction] = await FunctionAccount.init(switchboard, params, options);
   */
  public static async init(
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
   * @async
   * @function verify
   * @description Verify the Function Account
   *
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<boolean>} Promise that resolves to a boolean indicating whether the verification was successful
   *
   * @example
   * const isVerified = await functionAccount.verify(options);
   */
  public async verify(options?: TransactionOptions): Promise<boolean> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * @async
   * @function escrowFund
   * @description Fund the escrow of the Function Account
   *
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to the ContractTransaction
   *
   * @example
   * const contractTransaction = await functionAccount.escrowFund(options);
   */
  public async escrowFund(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }

  /**
   * @async
   * @function escrowWithdraw
   * @description Withdraw from the escrow of the Function Account
   *
   * @param {TransactionOptions} [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to the ContractTransaction
   *
   * @example
   * const contractTransaction = await functionAccount.escrowWithdraw(options);
   */
  public async escrowWithdraw(
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    throw new Error(`Not implemented yet`);
  }
}
