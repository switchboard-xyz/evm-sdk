import { type AggregatorInitParams } from "./accounts/AggregatorAccount.js";
import { type FunctionInitParams } from "./accounts/FunctionAccount.js";
import { type OracleInitParams } from "./accounts/OracleAccount.js";
import { QuoteInitParams } from "./accounts/QuoteAccount.js";
import {
  type Switchboard,
  SwitchboardAttestationService,
} from "./typechain-types/index.js";

import { type BigNumber, Contract, type Signer } from "ethers";

export type ContractMethodKeys<T extends Contract> = {
  [K in keyof T]: K extends keyof T["estimateGas"] ? K : never;
}[keyof T];

export interface Job {
  name: string;
  data: string;
  weight: number;
}

export type SwitchboardMethods = ContractMethodKeys<Switchboard>;

export type SwitchboardAttestationMethods =
  ContractMethodKeys<SwitchboardAttestationService>;

export type SendTransactionMethod = <T extends Contract>(
  contract: T,
  methodName: ContractMethodKeys<T>,
  args: Parameters<T[keyof T]>,
  options?: TransactionOptions
) => Promise<ReturnType<T[keyof T]>>;

export type TransactionOptions = {
  gasFactor?: number;
};

export type SendContractMethod<T extends Contract> = (
  methodName: ContractMethodKeys<T>,
  args: Parameters<T[keyof T]>,
  options?: TransactionOptions
) => Promise<ReturnType<T[keyof T]>>;

export interface ISwitchboardProgram {
  sb: Switchboard;
  vs?: SwitchboardAttestationService;

  address: Promise<string>;
  connect(signer: Signer): ISwitchboardProgram;

  sendSbTxn: SendContractMethod<Switchboard>;
  sendVsTxn: SendContractMethod<SwitchboardAttestationService>;
}

export type EventCallback = (
  e: any
) => Promise<void> /** | (() => Promise<void>) */;

export type RawMrEnclave = string | Buffer | Uint8Array | number[];

type Authority = { authority: string | Signer };

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
