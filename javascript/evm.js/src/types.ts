import {
  type AggregatorAccount,
  type AggregatorInitParams,
} from "./accounts/AggregatorAccount.js";
import { type EnclaveInitParams } from "./accounts/EnclaveAccount.js";
import type { LoadedFunctionAccount } from "./accounts/FunctionAccount.js";
import {
  type FunctionAccount,
  type FunctionInitParams,
} from "./accounts/FunctionAccount.js";
import { type OracleInitParams } from "./accounts/OracleAccount.js";
import type { SwitchboardPushReceiver } from "./switchboard-push-types/index.js";
import type { Switchboard } from "./switchboard-types/hardhat-diamond-abi/HardhatDiamondABI.sol";

import { type Big } from "@switchboard-xyz/common";
import {
  type BigNumber,
  type BigNumberish,
  type BytesLike,
  type Contract,
  type ContractTransaction,
  type PayableOverrides,
  type Signer,
} from "ethers";

/**
 * TransactionOptions is a type that allows the user to specify a subset of
 * PayableOverrides and includes optional properties for gasFactor, simulate and signer.
 *
 * ```typescript
 * {
 *   // an optional multiplier to modify the gasEstimation
 *   gasFactor: 1.1,
 *   // simulate the tx before sending
 *   simulate: true,
 *   // the new msg.sender for the tx
 *   signer: myNewSigner,
 *   // it also supports any fields from ethers PayableOverrides
 *   gasLimit: 3000000,
 *   gasPrice: 10000,
 *   maxFeePerGas: 10000,
 *   maxPriorityFeePerGas: 1000,
 *   nonce: 1337
 * }
 * ```
 */
export type TransactionOptions = Partial<PayableOverrides> & {
  // an optional multiplier to modify the gasEstimation
  gasFactor?: number;
  // simulate the tx before sending
  simulate?: boolean;
  // the msg.sender for the tx
  signer?: Signer;
};

/**
 * FunctionMethodNames is a utility type for mapping a contract's function names to their
 * respective function types. It includes only methods that return a Promise of ContractTransaction.
 */
export type FunctionMethodNames<T extends Contract> = {
  [K in keyof T["functions"]]: T["functions"][K] extends (
    ...args: Parameters<T["functions"][K]>
  ) => Promise<ContractTransaction>
    ? K
    : never;
}[keyof T["functions"]];

/**
 * EstimateGasMethodNames is a utility type for mapping a contract's function names to their
 * respective function types. It includes only methods that return a Promise of BigNumber.
 */
export type EstimateGasMethodNames<T extends Contract> = {
  [K in keyof T["estimateGas"]]: T["estimateGas"][K] extends (
    ...args: Parameters<T["estimateGas"][K]>
  ) => Promise<BigNumber>
    ? K
    : never;
}[keyof T["estimateGas"]];

/**
 * CallStaticMethodNames is a utility type for mapping a contract's function names to their
 * respective function types. It includes only methods that return the expected ReturnType.
 */
export type CallStaticMethodNames<T extends Contract> = {
  [K in keyof T["callStatic"]]: T["callStatic"][K] extends (
    ...args: Parameters<T["callStatic"][K]>
  ) => ReturnType<T["callStatic"][K]>
    ? K
    : never;
}[keyof T["callStatic"]];

/**
 * MethodNames is a utility type for extracting the common methods from FunctionMethodNames,
 * EstimateGasMethodNames, and CallStaticMethodNames.
 */
export type MethodNames<T extends Contract> = Extract<
  Extract<FunctionMethodNames<T>, EstimateGasMethodNames<T>>,
  CallStaticMethodNames<T>
>;

// export type ContractEvents<T extends Contract> = {};

/**
 * SwitchboardMethods is a type that represents the methods for the Switchboard contract.
 */
export type SwitchboardMethods = MethodNames<Switchboard>;

/**
 * SendTransactionMethod is a function type that takes a contract, method name, arguments,
 * and optional TransactionOptions to send a transaction.
 */
export type SendTransactionMethod = <
  T extends Contract,
  K extends MethodNames<T>
>(
  contract: T,
  methodName: K,
  args: Parameters<T[K]>,
  options: TransactionOptions | undefined
) => Promise<ContractTransaction>;

/**
 * PollTxnForEventFieldFn is a function type that takes a ContractTransaction and an optional
 * field name to poll a transaction for an emitted event field.
 */
export type PollTxnForEventFieldFn = {
  // If field is provided, assume were extracting a string unless specified
  <T = string>(tx: ContractTransaction, field: T): Promise<T>;
  // If field is not provided, require a type assertion
  <T>(tx: ContractTransaction, field?: undefined): Promise<T>;
};

/**
 * SendContractMethod is a function type that sends a method transaction on a contract.
 */
export type SendContractMethod<T extends Contract> = (
  methodName: MethodNames<T>,
  args: Parameters<T[MethodNames<T>]>,
  options: TransactionOptions | undefined
) => Promise<ContractTransaction>;

/**
 * The SwitchboardProgram class provides a high-level API to interact with the {@link Switchboard} smart contracts on the EVM.
 *
 * This class provides methods to send transactions, poll events, fetch accounts, and more. It requires a `Signer` or `Provider` instance and the address of the Switchboard contract to instantiate.
 *
 * ```typescript
 * // Instantiate SwitchboardProgram
 * const signer = new ethers.Wallet(privateKey);
 * const switchboardProgram = await SwitchboardProgram.load(
 *   signer, // Signer instance
 *   "0x73d6C66874e570f058834cAA666b2c352F1C792D" // Switchboard contract address
 * );
 *
 * // Send a transaction to Switchboard
 * const tx = await switchboardProgram.sendSbTxn("createOracleQueue", [
 *      name,
 *      authority,
 *      unpermissionedFeedsEnabled,
 *      maxSize,
 *      reward,
 *      oracleTimeout,
 *    ]
 * );
 *
 * // Fetch all aggregator data for a given authority
 * const authority = '0xabc123...'; // the public key of the authority
 * const aggregatorData = await switchboardProgram.fetchAggregators(authority);
 *
 * // Connect a new signer to SwitchboardProgram
 * const newSigner = new ethers.Wallet(newPrivateKey);
 * const newSwitchboardProgram = switchboardProgram.connect(newSigner);
 * ```
 */
export interface ISwitchboardProgram {
  // An instance of the {@link Switchboard} contract.
  sb: Switchboard;

  /**
   * A getter that returns a promise which resolves to the address of the signer.
   * If the address has already been fetched, it will be returned from the cache.
   * @returns Promise<string>
   *
   * ```typescript
   * const signerAddress = await switchboard.address;
   * ```
   */
  address: Promise<string>;
  chainId: Promise<number>;
  sbPushOracle: Promise<SwitchboardPushReceiver>;
  /**
   * Returns a new instance of the SwitchboardProgram with a new signer.
   * @param signer - The new signer
   * @returns SwitchboardProgram
   *
   * ```typescript
   * const newSwitchboardProgram = switchboardProgram.connect(newSigner);
   * ```
   */
  connect(signer: Signer): ISwitchboardProgram;

  /**
   * Sends a transaction to the Switchboard.sol contract
   * @param methodName - The name of the contract method to be called
   * @param args - The arguments to pass to the contract method
   * @param options - The options to pass to the contract method
   * @returns Promise<ContractTransaction>
   *
   * ```typescript
   * const transaction = await switchboardProgram.sendSbTxn('methodName', args, options);
   * ```
   */
  sendSbTxn: SendContractMethod<Switchboard>;

  /**
   * Polls a Switchboard contract transaction for an emitted event field
   * @param tx - The contract transaction to poll
   * @param field - An optional field name to extract from the event
   * @returns Promise<T>
   *
   * ```typescript
   * const accountAddress: string = await switchboardProgram.pollTxnForSbEvent(tx, 'accountAddress');
   * ```
   */
  pollTxnForSbEvent: PollTxnForEventFieldFn;

  /**
   * Fetches all functions for the Switchboard contract.
   * @returns An array of LoadedFunctionAccount's.
   *
   * ```typescript
   * // Fetch all function data for a given authority
   * const authority = '0xabc123...'; // the public key of the authority
   * const functionAccounts = await switchboardProgram.fetchFunctions(authority);
   *
   * // Now you can loop through the functionAccounts array to access individual data.
   * for (const account of functionAccounts) {
   *    console.log(account.data);
   * }
   * ```
   */
  fetchFunctions: () => Promise<LoadedFunctionAccount[]>;

  /**
   * Fetches an array of FunctionData instances for a given authority.
   * @param authority - The public key of the authority for which to fetch FunctionData.
   * @returns An array of LoadedFunctionAccount's.
   *
   * ```typescript
   * // Fetch all function data for a given authority
   * const authority = '0xabc123...'; // the public key of the authority
   * const functionData = await switchboardProgram.fetchFunctions(authority);
   *
   * // Now you can loop through the functionData array to access individual data.
   * for (const data of functionData) {
   *    console.log(data);
   * }
   * ```
   */
  fetchFunctionsByAuthority: (
    _authority?: string
  ) => Promise<LoadedFunctionAccount[]>;

  /**
   * Fetch the MrEnclave measurement for a given enclave authority address.
   * @param enclaveAuthority - The address of the enclave authority to fetch a measurement for.
   * @returns A enclave authorities MrEnclave measurement
   *
   * ```typescript
   * const mrEnclave = await switchboardProgram.getEnclaveAuthorityMrEnclave('0xMyEnclaveAuthority');
   * ```
   */
  getEnclaveAuthorityMrEnclave: (
    enclaveAuthority: string
  ) => Promise<Uint8Array>;
}

/**
 * Job is an interface that represents a job with a name, data, and weight.
 */
export interface Job {
  // the name of the job for easier identification
  name: string;
  // the serialized {@linkcode OracleJob}
  data: string;
  // the job weight for the weighted median calculation of Aggregator job responses
  weight: number;
}

/**
 * EventCallback is a type that represents a function to be called when an event occurs.
 */
export type EventCallback = (
  e: any
) => Promise<void> /** | (() => Promise<void>) */;

/**
 * RawMrEnclave is a type that can be a string, Buffer, Uint8Array, or an array of numbers.
 */
export type RawMrEnclave = string | Buffer | Uint8Array | number[];

/**
 * Represents an account that will optionally sign the tx.
 */
export type OptionalSigner = string | Signer;

/**
 * Authority is a type that represents an authority, which can be a string or a Signer.
 */
export type Authority = { authority: OptionalSigner };

/**
 * CreateOracle is a type that represents parameters to create an Oracle with an Authority.
 */
export type CreateOracle = Exclude<OracleInitParams, "authority"> & Authority;

/**
 * CreateAggregator is a type that represents parameters to create an Aggregator with an Authority.
 */
export type CreateAggregator = Exclude<AggregatorInitParams, "authority"> &
  Authority;

/**
 * CreateFunction is a type that represents parameters to create a Function with an Authority.
 */
export type CreateFunction = Exclude<FunctionInitParams, "authority"> &
  Authority;

/**
 * CreateEnclave is a type that represents parameters to create a Enclave with an Authority and owner.
 */
export type CreateEnclave = Exclude<EnclaveInitParams, "authority"> & Authority;

/**
 * EnablePermissions is a type that can be a boolean or a queueAuthority as a Signer.
 */
export type EnablePermissions = boolean | { queueAuthority: Signer };

/**
 * OracleQueueData is a type that represents the data for an {@link OracleQueueAccount}.
 * ```typescript
 * [
 *   'Queue1',
 *   '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   true,
 *   BigNumber { value: "32" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "180" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "0" },
 *   name: 'Queue1',
 *   authority: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   unpermissionedFeedsEnabled: true,
 *   maxSize: BigNumber { value: "32" },
 *   reward: BigNumber { value: "0" },
 *   oracleTimeout: BigNumber { value: "180" },
 *   gcIdx: BigNumber { value: "0" },
 *   currIdx: BigNumber { value: "0" }
 * ]
 * ```
 */
export type OracleQueueData = Awaited<ReturnType<Switchboard["oracleQueues"]>>;

/**
 * OracleQueueAttestationConfig is a type that represents the attestation config for an {@link OracleQueueAccount}.
 */
export type OracleQueueAttestationConfig = Awaited<
  ReturnType<Switchboard["queueAttestationConfigs"]>
>;

/**
 * AttestationQueueData is a type that represents the data for an {@link AttestationQueueAccount}.
 * ```typescript
 * [
 *   '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
 *   BigNumber { value: "180" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "604800" },
 *   BigNumber { value: "1" },
 *   false,
 *   false,
 *   BigNumber { value: "3000000" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "0" },
 *   authority: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
 *   maxSize: BigNumber { value: "180" },
 *   reward: BigNumber { value: "0" },
 *   lastHeartbeat: BigNumber { value: "0" },
 *   maxEnclaveVerificationAge: BigNumber { value: "604800" },
 *   allowAuthorityOverrideAfter: BigNumber { value: "1" },
 *   requireAuthorityHeartbeatPermission: false,
 *   requireUsagePermissions: false,
 *   enclaveTimeout: BigNumber { value: "3000000" },
 *   gcIdx: BigNumber { value: "0" },
 *   currIdx: BigNumber { value: "0" }
 * ]
 * ```
 */
export type AttestationQueueData = Awaited<
  ReturnType<Switchboard["attestationQueues"]>
>;

/**
 * OracleData is a type that represents the data for an {@link OracleAccount}.
 * ```typescript
 * [
 *   '',
 *   '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   0,
 *   BigNumber { value: "0" },
 *   '0xF688A2F2828f0F8E6E2214f462892a3cd3ceC8a3',
 *   name: '',
 *   authority: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   numRows: 0,
 *   lastHeartbeat: BigNumber { value: "0" },
 *   queueAddress: '0xF688A2F2828f0F8E6E2214f462892a3cd3ceC8a3'
 * ]
 * ```
 */
export type OracleData = Awaited<ReturnType<Switchboard["oracles"]>>;

/**
 * AggregatorData is a type that represents the data for an {@link AggregatorAccount}.
 * ```typescript
 * [
 *   'switchboard_feed',
 *   '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   [
 *     BigNumber { value: "0" },
 *     BigNumber { value: "0" },
 *     '0x0000000000000000000000000000000000000000',
 *     value: BigNumber { value: "0" },
 *     timestamp: BigNumber { value: "0" },
 *     oracleAddress: '0x0000000000000000000000000000000000000000'
 *   ],
 *   BigNumber { value: "1" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "1" },
 *   '',
 *   '0xfF5C1DD2A7cA6a4d76a902DaC6B0Fc99BcD54563',
 *   BigNumber { value: "0" },
 *   BigNumber { value: "1685024425" },
 *   BigNumber { value: "0" },
 *   BigNumber { value: "0" },
 *   name: 'switchboard_feed',
 *   authority: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   latestResult: [
 *     BigNumber { value: "0" },
 *     BigNumber { value: "0" },
 *     '0x0000000000000000000000000000000000000000',
 *     value: BigNumber { value: "0" },
 *     timestamp: BigNumber { value: "0" },
 *     oracleAddress: '0x0000000000000000000000000000000000000000'
 *   ],
 *   batchSize: BigNumber { value: "1" },
 *   minUpdateDelaySeconds: BigNumber { value: "0" },
 *   minOracleResults: BigNumber { value: "1" },
 *   jobsHash: '',
 *   queueAddress: '0xfF5C1DD2A7cA6a4d76a902DaC6B0Fc99BcD54563',
 *   balanceLeftForInterval: BigNumber { value: "0" },
 *   nextIntervalRefreshTime: BigNumber { value: "1685024425" },
 *   intervalId: BigNumber { value: "0" },
 *   balance: BigNumber { value: "0" }
 * ]
 * ```
 */
export type AggregatorData = Awaited<ReturnType<Switchboard["aggregators"]>>;

/**
 * FunctionData is a type that represents the data for a {@link FunctionAccount}.
 */
export type FunctionData = Awaited<ReturnType<Switchboard["funcs"]>>;

/**
 * EnclaveData is a type that represents the data for a {@link EnclaveAccount}.
 * ```typescript
 * [
 *   '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
 *   '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
 *   '0x19ef1517eEFE5A6278e8290455D6d530Ee82Dcb9',
 *   '0x',
 *   1,
 *   BigNumber { value: "0" },
 *   BigNumber { value: "0" },
 *   '0x0000000000000000000000000000000000000000000000000000000000000000',
 *   false,
 *   BigNumber { value: "0" },
 *   authority: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
 *   owner: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
 *   queueAddress: '0x19ef1517eEFE5A6278e8290455D6d530Ee82Dcb9',
 *   cid: '0x',
 *   verificationStatus: 1,
 *   verificationTimestamp: BigNumber { value: "0" },
 *   validUntil: BigNumber { value: "0" },
 *   mrEnclave: '0x0000000000000000000000000000000000000000000000000000000000000000',
 *   isOnQueue: false,
 *   lastHeartbeat: BigNumber { value: "0" }
 * ]
 * ```
 */
export type EnclaveData = Awaited<ReturnType<Switchboard["enclaves"]>>;

/**
 * PermissionStatus is an enumeration of possible permission statuses.
 */
export const PermissionStatus = {
  NONE: 0,
  PERMIT_ORACLE_HEARTBEAT: 1 << 0,
  PERMIT_ORACLE_QUEUE_USAGE: 1 << 1,
  PERMIT_ATTESTATION_QUEUE_USAGE: 1 << 2,
} as const;

export type PermissionStatusType = keyof typeof PermissionStatus;

export type LatestRawValue = [BigNumber, BigNumber] & {
  value: BigNumber;
  timestamp: BigNumber;
};

export type LatestResult = { result: Big; timestamp: number };

export type LatestResults = Array<LatestResult & { oracleId: string }>;

/**
 * VerificationStatus is an enumeration of possible verification statuses.
 */
export const VerificationStatus = {
  PENDING: 0,
  FAILURE: 1,
  SUCCESS: 2,
  OVERRIDE: 3,
} as const;

export type VerificationStatusType = keyof typeof VerificationStatus;

export type TransactionStruct = {
  expirationTimeSeconds: BigNumberish;
  gasLimit: BigNumberish;
  value: BigNumberish;
  to: string;
  from: string;
  data: BytesLike;
};

/**
 * PermissionStatus is an enumeration of possible permission statuses.
 */
export const FunctionStatus = {
  NONE: 0,
  ACTIVE: 1,
  NON_EXECUTABLE: 2,
  EXPIRED: 3,
  OUT_OF_FUNDS: 4,
  INVALID_PERMISSIONS: 5,
  DEACTIVATED: 6,
} as const;

export type FunctionStatusType = keyof typeof FunctionStatus;

export type RoutineData = Awaited<ReturnType<Switchboard["routines"]>>;
export type RequestData = Awaited<ReturnType<Switchboard["requests"]>>;
