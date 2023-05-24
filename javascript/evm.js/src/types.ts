import { type AggregatorInitParams } from "./accounts/AggregatorAccount.js";
import { type FunctionInitParams } from "./accounts/FunctionAccount.js";
import { type OracleInitParams } from "./accounts/OracleAccount.js";
import {
  type Switchboard,
  SwitchboardAttestationService,
} from "./typechain-types/index.js";

import { type BigNumber, type Signer } from "ethers";

export interface Job {
  name: string;
  data: string;
  weight: number;
}

export type EventCallback = (
  e: any
) => Promise<void> /** | (() => Promise<void>) */;

export type RawMrEnclave = string | Buffer | Uint8Array | number[];

type Authority = { authority: string } | { signer: Signer };

export type CreateOracle = Exclude<OracleInitParams, "authority"> & Authority;

export type CreateAggregator = Exclude<
  AggregatorInitParams & { initialValue: BigNumber },
  "authority"
> &
  Authority;

export type CreateFunction = Exclude<FunctionInitParams, "authority"> &
  Authority;

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
