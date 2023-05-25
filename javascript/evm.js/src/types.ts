import { type AggregatorInitParams } from "./accounts/AggregatorAccount.js";
import { type FunctionInitParams } from "./accounts/FunctionAccount.js";
import { type OracleInitParams } from "./accounts/OracleAccount.js";
import { type QuoteInitParams } from "./accounts/QuoteAccount.js";
import {
  type Switchboard,
  type SwitchboardAttestationService,
} from "./typechain-types/index.js";

import {
  type BigNumber,
  type Contract,
  type ContractTransaction,
  type PayableOverrides,
  type Signer,
} from "ethers";

/**
 * TransactionOptions is a type that allows the user to specify a subset of
 * PayableOverrides and includes optional properties for gasFactor, simulate and signer.
 */
export type TransactionOptions = Partial<PayableOverrides> & {
  gasFactor?: number;
  simulate?: boolean;
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
 * SwitchboardAttestationMethods is a type that represents the methods for the SwitchboardAttestationService contract.
 */
export type SwitchboardAttestationMethods =
  MethodNames<SwitchboardAttestationService>;

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
 * The SwitchboardProgram class provides a high-level API to interact with the Switchboard and SwitchboardAttestationService smart contracts on the EVM.
 *
 * This class provides methods to send transactions, poll events, fetch accounts, and more. It requires a `Signer` or `Provider` instance and the address of the Switchboard contract to instantiate.
 *
 * @example
 * ```ts
 * // Instantiate SwitchboardProgram
 * const signer = new ethers.Wallet(privateKey);
 * const switchboardProgram = await SwitchboardProgram.load(
 *   signer, // Signer instance
 *   "0x73d6C66874e570f058834cAA666b2c352F1C792D" // Switchboard contract address
 * );
 *
 * // Send a transaction to Switchboard
 * const methodName = 'methodName'; // replace with actual method name
 * const args = [arg1, arg2]; // replace with actual arguments
 * const options = {}; // transaction options
 * const txResponse = await switchboardProgram.sendSbTxn(methodName, args, options);
 *
 * // Poll a transaction for an emitted event field
 * const field = 'eventName'; // replace with actual event field name
 * const eventResult = await switchboardProgram.pollTxnForSbEvent(txResponse, field);
 *
 * // Fetch all aggregator data for a given authority
 * const authority = '0xabc123...'; // the public key of the authority
 * const aggregatorData = await switchboardProgram.fetchAggregators(authority);
 *
 * // Connect a new signer to SwitchboardProgram
 * const newSigner = new ethers.Wallet(newPrivateKey);
 * const newSwitchboardProgram = switchboardProgram.connect(newSigner);
 * ```
 *
 */
export interface ISwitchboardProgram {
  sb: Switchboard;
  vs?: SwitchboardAttestationService;

  address: Promise<string>;
  connect(signer: Signer): ISwitchboardProgram;

  hasAttestationService: () => void;

  sendSbTxn: SendContractMethod<Switchboard>;
  sendVsTxn: SendContractMethod<SwitchboardAttestationService>;

  pollTxnForSbEvent: PollTxnForEventFieldFn;
  pollTxnForVsEvent: PollTxnForEventFieldFn;
}

/**
 * Job is an interface that represents a job with a name, data, and weight.
 */
export interface Job {
  name: string;
  data: string;
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
 * Authority is a type that represents an authority, which can be a string or a Signer.
 */
export type Authority = { authority: string | Signer };

/**
 * CreateOracle is a type that represents parameters to create an Oracle with an Authority.
 */
export type CreateOracle = Exclude<OracleInitParams, "authority"> & Authority;

/**
 * CreateAggregator is a type that represents parameters to create an Aggregator with an Authority.
 */
export type CreateAggregator = Exclude<
  AggregatorInitParams & { initialValue: BigNumber },
  "authority"
> &
  Authority;

/**
 * CreateFunction is a type that represents parameters to create a Function with an Authority.
 */
export type CreateFunction = Exclude<FunctionInitParams, "authority"> &
  Authority;

/**
 * CreateQuote is a type that represents parameters to create a Quote with an Authority and owner.
 */
export type CreateQuote = Exclude<
  Exclude<QuoteInitParams, "authority">,
  "owner"
> &
  Authority & { owner: string };

/**
 * EnablePermissions is a type that can be a boolean or a queueAuthority as a Signer.
 */
export type EnablePermissions = boolean | { queueAuthority: Signer };

/**
 * OracleQueueData is a type that represents the data for an {@link OracleQueueAccount}.
 */
export type OracleQueueData = Awaited<ReturnType<Switchboard["queues"]>>;

/**
 * OracleQueueAttestationConfig is a type that represents the attestation config for an {@link OracleQueueAccount}.
 */
export type OracleQueueAttestationConfig = Awaited<
  ReturnType<Switchboard["queueAttestationConfigs"]>
>;

/**
 * AttestationQueueData is a type that represents the data for an {@link AttestationQueueAccount}.
 */
export type AttestationQueueData = Awaited<
  ReturnType<SwitchboardAttestationService["queues"]>
>;

/**
 * OracleData is a type that represents the data for an {@link OracleAccount}.
 */
export type OracleData = Awaited<ReturnType<Switchboard["oracles"]>>;

/**
 * AggregatorData is a type that represents the data for an {@link AggregatorAccount}.
 */
export type AggregatorData = Awaited<ReturnType<Switchboard["aggregators"]>>;

/**
 * FunctionData is a type that represents the data for a {@link FunctionAccount}.
 */
export type FunctionData = Awaited<
  ReturnType<SwitchboardAttestationService["funcs"]>
>;

/**
 * QuoteData is a type that represents the data for a {@link QuoteAccount}.
 */
export type QuoteData = Awaited<
  ReturnType<SwitchboardAttestationService["quotes"]>
>;

/**
 * PermissionStatus is an enumeration of possible permission statuses.
 */
export enum PermissionStatus {
  PERMIT_ORACLE_HEARTBEAT = 1 << 0,
  PERMIT_ORACLE_QUEUE_USAGE = 1 << 1,
  PERMIT_ATTESTATION_QUEUE_USAGE = 1 << 2,
}

/**
 * VerificationStatus is an enumeration of possible verification statuses.
 */
export enum VerificationStatus {
  VERIFICATION_PENDING = 0,
  VERIFICATION_FAILURE = 1,
  VERIFICATION_SUCCESS = 2,
  VERIFICATION_OVERRIDE = 3,
}
