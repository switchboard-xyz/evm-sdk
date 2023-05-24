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

export type TransactionOptions = Partial<PayableOverrides> & {
  gasFactor?: number;
  simulate?: boolean;
  signer?: Signer;
};

export type FunctionMethodNames<T extends Contract> = {
  [K in keyof T["functions"]]: T["functions"][K] extends (
    ...args: Parameters<T["functions"][K]>
  ) => Promise<ContractTransaction>
    ? K
    : never;
}[keyof T["functions"]];

export type EstimateGasMethodNames<T extends Contract> = {
  [K in keyof T["estimateGas"]]: T["estimateGas"][K] extends (
    ...args: Parameters<T["estimateGas"][K]>
  ) => Promise<BigNumber>
    ? K
    : never;
}[keyof T["estimateGas"]];

export type CallStaticMethodNames<T extends Contract> = {
  [K in keyof T["callStatic"]]: T["callStatic"][K] extends (
    ...args: Parameters<T["callStatic"][K]>
  ) => ReturnType<T["callStatic"][K]>
    ? K
    : never;
}[keyof T["callStatic"]];

export type MethodNames<T extends Contract> = Extract<
  Extract<FunctionMethodNames<T>, EstimateGasMethodNames<T>>,
  CallStaticMethodNames<T>
>;

export type ContractEvents<T extends Contract> = {};

export type SwitchboardMethods = MethodNames<Switchboard>;

export type SwitchboardAttestationMethods =
  MethodNames<SwitchboardAttestationService>;

export type SendTransactionMethod = <
  T extends Contract,
  K extends MethodNames<T>
>(
  contract: T,
  methodName: K,
  args: Parameters<T[K]>,
  options: TransactionOptions | undefined
) => Promise<ContractTransaction>;

export type PollTxnForEventFieldFn = {
  // If field is provided, assume were extracting a string unless specified
  <T = string>(tx: ContractTransaction, field: T): Promise<T>;
  // If field is not provided, require a type assertion
  <T>(tx: ContractTransaction, field?: undefined): Promise<T>;
};

export type SendContractMethod<T extends Contract> = (
  methodName: MethodNames<T>,
  args: Parameters<T[MethodNames<T>]>,
  options: TransactionOptions | undefined
) => Promise<ContractTransaction>;

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

export interface Job {
  name: string;
  data: string;
  weight: number;
}

export type EventCallback = (
  e: any
) => Promise<void> /** | (() => Promise<void>) */;

export type RawMrEnclave = string | Buffer | Uint8Array | number[];

export type Authority = { authority: string | Signer };

export type CreateOracle = Exclude<OracleInitParams, "authority"> & Authority;

export type CreateAggregator = Exclude<
  AggregatorInitParams & { initialValue: BigNumber },
  "authority"
> &
  Authority;

export type CreateFunction = Exclude<FunctionInitParams, "authority"> &
  Authority;

export type CreateQuote = Exclude<
  Exclude<QuoteInitParams, "authority">,
  "owner"
> &
  Authority & { owner: string };

export type EnablePermissions = boolean | { queueAuthority: Signer };

export type OracleQueueData = Awaited<ReturnType<Switchboard["queues"]>>;

export type AttestationQueueData = Awaited<
  ReturnType<SwitchboardAttestationService["queues"]>
>;

export type OracleData = Awaited<ReturnType<Switchboard["oracles"]>>;

export type AggregatorData = Awaited<ReturnType<Switchboard["aggregators"]>>;

export type FunctionData = Awaited<
  ReturnType<SwitchboardAttestationService["funcs"]>
>;

export type QuoteData = Awaited<
  ReturnType<SwitchboardAttestationService["quotes"]>
>;

export enum PermissionStatus {
  PERMIT_ORACLE_HEARTBEAT = 1 << 0,
  PERMIT_ORACLE_QUEUE_USAGE = 1 << 1,
  PERMIT_ATTESTATION_QUEUE_USAGE = 1 << 2,
}

export enum VerificationStatus {
  VERIFICATION_PENDING = 0,
  VERIFICATION_FAILURE = 1,
  VERIFICATION_SUCCESS = 2,
  VERIFICATION_OVERRIDE = 3,
}
