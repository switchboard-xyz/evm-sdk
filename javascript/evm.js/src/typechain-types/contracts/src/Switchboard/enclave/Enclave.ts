/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export declare namespace EnclaveLib {
  export type EnclaveStruct = {
    authority: PromiseOrValue<string>;
    owner: PromiseOrValue<string>;
    queueId: PromiseOrValue<string>;
    cid: PromiseOrValue<BytesLike>;
    verificationStatus: PromiseOrValue<BigNumberish>;
    verificationTimestamp: PromiseOrValue<BigNumberish>;
    validUntil: PromiseOrValue<BigNumberish>;
    mrEnclave: PromiseOrValue<BytesLike>;
    isOnQueue: PromiseOrValue<boolean>;
    lastHeartbeat: PromiseOrValue<BigNumberish>;
    balance: PromiseOrValue<BigNumberish>;
  };

  export type EnclaveStructOutput = [
    string,
    string,
    string,
    string,
    number,
    BigNumber,
    BigNumber,
    string,
    boolean,
    BigNumber,
    BigNumber
  ] & {
    authority: string;
    owner: string;
    queueId: string;
    cid: string;
    verificationStatus: number;
    verificationTimestamp: BigNumber;
    validUntil: BigNumber;
    mrEnclave: string;
    isOnQueue: boolean;
    lastHeartbeat: BigNumber;
    balance: BigNumber;
  };
}

export interface EnclaveInterface extends utils.Interface {
  functions: {
    "createEnclave(address,address,address)": FunctionFragment;
    "createEnclaveWithId(address,address,address,address)": FunctionFragment;
    "enclaveAuthorityToEnclaveAddress(address)": FunctionFragment;
    "enclaveGarbageCollect(address,uint256)": FunctionFragment;
    "enclaveHeartbeat(address)": FunctionFragment;
    "enclaves(address)": FunctionFragment;
    "failEnclave(address,address,uint256)": FunctionFragment;
    "forceOverrideVerify(address)": FunctionFragment;
    "isEnclaveValid(address)": FunctionFragment;
    "rotateAuthority(address,address)": FunctionFragment;
    "updateEnclave(address,bytes)": FunctionFragment;
    "validate(address,address,bytes32[])": FunctionFragment;
    "verifyEnclave(address,address,uint256,uint256,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createEnclave"
      | "createEnclaveWithId"
      | "enclaveAuthorityToEnclaveAddress"
      | "enclaveGarbageCollect"
      | "enclaveHeartbeat"
      | "enclaves"
      | "failEnclave"
      | "forceOverrideVerify"
      | "isEnclaveValid"
      | "rotateAuthority"
      | "updateEnclave"
      | "validate"
      | "verifyEnclave"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createEnclave",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createEnclaveWithId",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "enclaveAuthorityToEnclaveAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "enclaveGarbageCollect",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "enclaveHeartbeat",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "enclaves",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "failEnclave",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "forceOverrideVerify",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isEnclaveValid",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "rotateAuthority",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEnclave",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "validate",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyEnclave",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "createEnclave",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEnclaveWithId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enclaveAuthorityToEnclaveAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enclaveGarbageCollect",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enclaveHeartbeat",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "enclaves", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "failEnclave",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "forceOverrideVerify",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isEnclaveValid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rotateAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateEnclave",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "validate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyEnclave",
    data: BytesLike
  ): Result;

  events: {
    "EnclaveAccountInit(address,address)": EventFragment;
    "EnclaveGC(address,address)": EventFragment;
    "EnclaveHeartbeat(address,address)": EventFragment;
    "EnclavePayoutEvent(address,address,uint256)": EventFragment;
    "EnclaveRotateAuthority(address,address,address)": EventFragment;
    "EnclaveVerifyRequest(address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EnclaveAccountInit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnclaveGC"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnclaveHeartbeat"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnclavePayoutEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnclaveRotateAuthority"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnclaveVerifyRequest"): EventFragment;
}

export interface EnclaveAccountInitEventObject {
  authority: string;
  accountId: string;
}
export type EnclaveAccountInitEvent = TypedEvent<
  [string, string],
  EnclaveAccountInitEventObject
>;

export type EnclaveAccountInitEventFilter =
  TypedEventFilter<EnclaveAccountInitEvent>;

export interface EnclaveGCEventObject {
  enclaveId: string;
  queue: string;
}
export type EnclaveGCEvent = TypedEvent<[string, string], EnclaveGCEventObject>;

export type EnclaveGCEventFilter = TypedEventFilter<EnclaveGCEvent>;

export interface EnclaveHeartbeatEventObject {
  enclaveId: string;
  authority: string;
}
export type EnclaveHeartbeatEvent = TypedEvent<
  [string, string],
  EnclaveHeartbeatEventObject
>;

export type EnclaveHeartbeatEventFilter =
  TypedEventFilter<EnclaveHeartbeatEvent>;

export interface EnclavePayoutEventEventObject {
  nodeId: string;
  enclaveId: string;
  amount: BigNumber;
}
export type EnclavePayoutEventEvent = TypedEvent<
  [string, string, BigNumber],
  EnclavePayoutEventEventObject
>;

export type EnclavePayoutEventEventFilter =
  TypedEventFilter<EnclavePayoutEventEvent>;

export interface EnclaveRotateAuthorityEventObject {
  queueId: string;
  oldAuthority: string;
  newAuthority: string;
}
export type EnclaveRotateAuthorityEvent = TypedEvent<
  [string, string, string],
  EnclaveRotateAuthorityEventObject
>;

export type EnclaveRotateAuthorityEventFilter =
  TypedEventFilter<EnclaveRotateAuthorityEvent>;

export interface EnclaveVerifyRequestEventObject {
  queueId: string;
  verifier: string;
  verifiee: string;
}
export type EnclaveVerifyRequestEvent = TypedEvent<
  [string, string, string],
  EnclaveVerifyRequestEventObject
>;

export type EnclaveVerifyRequestEventFilter =
  TypedEventFilter<EnclaveVerifyRequestEvent>;

export interface Enclave extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EnclaveInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createEnclave(
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createEnclaveWithId(
      enclaveId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    enclaveAuthorityToEnclaveAddress(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    enclaveGarbageCollect(
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    enclaveHeartbeat(
      enclaveId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    enclaves(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[EnclaveLib.EnclaveStructOutput]>;

    failEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    forceOverrideVerify(
      enclaveId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isEnclaveValid(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    rotateAuthority(
      enclaveId: PromiseOrValue<string>,
      newAuthority: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateEnclave(
      enclaveId: PromiseOrValue<string>,
      cid: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    validate(
      authority: PromiseOrValue<string>,
      attestationQueueId: PromiseOrValue<string>,
      validMeasurements: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<[void]>;

    verifyEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      mrEnclave: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createEnclave(
    authority: PromiseOrValue<string>,
    queueId: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createEnclaveWithId(
    enclaveId: PromiseOrValue<string>,
    authority: PromiseOrValue<string>,
    queueId: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  enclaveAuthorityToEnclaveAddress(
    authority: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  enclaveGarbageCollect(
    enclaveId: PromiseOrValue<string>,
    enclaveIdx: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  enclaveHeartbeat(
    enclaveId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  enclaves(
    enclaveId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<EnclaveLib.EnclaveStructOutput>;

  failEnclave(
    verifierId: PromiseOrValue<string>,
    enclaveId: PromiseOrValue<string>,
    enclaveIdx: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  forceOverrideVerify(
    enclaveId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isEnclaveValid(
    enclaveId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  rotateAuthority(
    enclaveId: PromiseOrValue<string>,
    newAuthority: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateEnclave(
    enclaveId: PromiseOrValue<string>,
    cid: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  validate(
    authority: PromiseOrValue<string>,
    attestationQueueId: PromiseOrValue<string>,
    validMeasurements: PromiseOrValue<BytesLike>[],
    overrides?: CallOverrides
  ): Promise<void>;

  verifyEnclave(
    verifierId: PromiseOrValue<string>,
    enclaveId: PromiseOrValue<string>,
    enclaveIdx: PromiseOrValue<BigNumberish>,
    timestamp: PromiseOrValue<BigNumberish>,
    mrEnclave: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createEnclave(
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createEnclaveWithId(
      enclaveId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    enclaveAuthorityToEnclaveAddress(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    enclaveGarbageCollect(
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    enclaveHeartbeat(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    enclaves(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<EnclaveLib.EnclaveStructOutput>;

    failEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    forceOverrideVerify(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isEnclaveValid(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    rotateAuthority(
      enclaveId: PromiseOrValue<string>,
      newAuthority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateEnclave(
      enclaveId: PromiseOrValue<string>,
      cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    validate(
      authority: PromiseOrValue<string>,
      attestationQueueId: PromiseOrValue<string>,
      validMeasurements: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    verifyEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      mrEnclave: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "EnclaveAccountInit(address,address)"(
      authority?: PromiseOrValue<string> | null,
      accountId?: PromiseOrValue<string> | null
    ): EnclaveAccountInitEventFilter;
    EnclaveAccountInit(
      authority?: PromiseOrValue<string> | null,
      accountId?: PromiseOrValue<string> | null
    ): EnclaveAccountInitEventFilter;

    "EnclaveGC(address,address)"(
      enclaveId?: PromiseOrValue<string> | null,
      queue?: PromiseOrValue<string> | null
    ): EnclaveGCEventFilter;
    EnclaveGC(
      enclaveId?: PromiseOrValue<string> | null,
      queue?: PromiseOrValue<string> | null
    ): EnclaveGCEventFilter;

    "EnclaveHeartbeat(address,address)"(
      enclaveId?: PromiseOrValue<string> | null,
      authority?: PromiseOrValue<string> | null
    ): EnclaveHeartbeatEventFilter;
    EnclaveHeartbeat(
      enclaveId?: PromiseOrValue<string> | null,
      authority?: PromiseOrValue<string> | null
    ): EnclaveHeartbeatEventFilter;

    "EnclavePayoutEvent(address,address,uint256)"(
      nodeId?: PromiseOrValue<string> | null,
      enclaveId?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null
    ): EnclavePayoutEventEventFilter;
    EnclavePayoutEvent(
      nodeId?: PromiseOrValue<string> | null,
      enclaveId?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null
    ): EnclavePayoutEventEventFilter;

    "EnclaveRotateAuthority(address,address,address)"(
      queueId?: PromiseOrValue<string> | null,
      oldAuthority?: PromiseOrValue<string> | null,
      newAuthority?: PromiseOrValue<string> | null
    ): EnclaveRotateAuthorityEventFilter;
    EnclaveRotateAuthority(
      queueId?: PromiseOrValue<string> | null,
      oldAuthority?: PromiseOrValue<string> | null,
      newAuthority?: PromiseOrValue<string> | null
    ): EnclaveRotateAuthorityEventFilter;

    "EnclaveVerifyRequest(address,address,address)"(
      queueId?: PromiseOrValue<string> | null,
      verifier?: PromiseOrValue<string> | null,
      verifiee?: PromiseOrValue<string> | null
    ): EnclaveVerifyRequestEventFilter;
    EnclaveVerifyRequest(
      queueId?: PromiseOrValue<string> | null,
      verifier?: PromiseOrValue<string> | null,
      verifiee?: PromiseOrValue<string> | null
    ): EnclaveVerifyRequestEventFilter;
  };

  estimateGas: {
    createEnclave(
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createEnclaveWithId(
      enclaveId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    enclaveAuthorityToEnclaveAddress(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    enclaveGarbageCollect(
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    enclaveHeartbeat(
      enclaveId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    enclaves(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    failEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    forceOverrideVerify(
      enclaveId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isEnclaveValid(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rotateAuthority(
      enclaveId: PromiseOrValue<string>,
      newAuthority: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateEnclave(
      enclaveId: PromiseOrValue<string>,
      cid: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    validate(
      authority: PromiseOrValue<string>,
      attestationQueueId: PromiseOrValue<string>,
      validMeasurements: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      mrEnclave: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createEnclave(
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createEnclaveWithId(
      enclaveId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      queueId: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    enclaveAuthorityToEnclaveAddress(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    enclaveGarbageCollect(
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    enclaveHeartbeat(
      enclaveId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    enclaves(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    failEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    forceOverrideVerify(
      enclaveId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isEnclaveValid(
      enclaveId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rotateAuthority(
      enclaveId: PromiseOrValue<string>,
      newAuthority: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateEnclave(
      enclaveId: PromiseOrValue<string>,
      cid: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    validate(
      authority: PromiseOrValue<string>,
      attestationQueueId: PromiseOrValue<string>,
      validMeasurements: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyEnclave(
      verifierId: PromiseOrValue<string>,
      enclaveId: PromiseOrValue<string>,
      enclaveIdx: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      mrEnclave: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
