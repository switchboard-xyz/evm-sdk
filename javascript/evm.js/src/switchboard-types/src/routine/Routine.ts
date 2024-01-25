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
} from "../../common";

export declare namespace RoutineLib {
  export type RoutineStruct = {
    functionId: PromiseOrValue<string>;
    authority: PromiseOrValue<string>;
    schedule: PromiseOrValue<string>;
    params: PromiseOrValue<BytesLike>;
    lastCalledAt: PromiseOrValue<BigNumberish>;
    consecutiveFailures: PromiseOrValue<BigNumberish>;
    balance: PromiseOrValue<BigNumberish>;
    status: PromiseOrValue<BigNumberish>;
    errorCode: PromiseOrValue<BigNumberish>;
    createdAt: PromiseOrValue<BigNumberish>;
  };

  export type RoutineStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    number,
    number,
    BigNumber
  ] & {
    functionId: string;
    authority: string;
    schedule: string;
    params: string;
    lastCalledAt: BigNumber;
    consecutiveFailures: BigNumber;
    balance: BigNumber;
    status: number;
    errorCode: number;
    createdAt: BigNumber;
  };
}

export interface RoutineInterface extends utils.Interface {
  functions: {
    "createRoutineWithId(address,address,address,bytes,string)": FunctionFragment;
    "getActiveRoutinesByQueue(address)": FunctionFragment;
    "getRoutinesByAuthority(address)": FunctionFragment;
    "getRoutinesByFunctionId(address)": FunctionFragment;
    "routineEscrowFund(address)": FunctionFragment;
    "routineEscrowWithdraw(address,uint256)": FunctionFragment;
    "routineExists(address)": FunctionFragment;
    "routines(address)": FunctionFragment;
    "updateRoutine(address,address,address,bytes,string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createRoutineWithId"
      | "getActiveRoutinesByQueue"
      | "getRoutinesByAuthority"
      | "getRoutinesByFunctionId"
      | "routineEscrowFund"
      | "routineEscrowWithdraw"
      | "routineExists"
      | "routines"
      | "updateRoutine"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createRoutineWithId",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getActiveRoutinesByQueue",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoutinesByAuthority",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoutinesByFunctionId",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "routineEscrowFund",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "routineEscrowWithdraw",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "routineExists",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "routines",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateRoutine",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "createRoutineWithId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActiveRoutinesByQueue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoutinesByAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoutinesByFunctionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "routineEscrowFund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "routineEscrowWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "routineExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "routines", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateRoutine",
    data: BytesLike
  ): Result;

  events: {
    "RoutineCreated(address,address,address,bytes)": EventFragment;
    "RoutineFund(address,address,uint256)": EventFragment;
    "RoutineWithdraw(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RoutineCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoutineFund"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoutineWithdraw"): EventFragment;
}

export interface RoutineCreatedEventObject {
  functionId: string;
  sender: string;
  routineId: string;
  params: string;
}
export type RoutineCreatedEvent = TypedEvent<
  [string, string, string, string],
  RoutineCreatedEventObject
>;

export type RoutineCreatedEventFilter = TypedEventFilter<RoutineCreatedEvent>;

export interface RoutineFundEventObject {
  functionId: string;
  funder: string;
  amount: BigNumber;
}
export type RoutineFundEvent = TypedEvent<
  [string, string, BigNumber],
  RoutineFundEventObject
>;

export type RoutineFundEventFilter = TypedEventFilter<RoutineFundEvent>;

export interface RoutineWithdrawEventObject {
  functionId: string;
  funder: string;
  amount: BigNumber;
}
export type RoutineWithdrawEvent = TypedEvent<
  [string, string, BigNumber],
  RoutineWithdrawEventObject
>;

export type RoutineWithdrawEventFilter = TypedEventFilter<RoutineWithdrawEvent>;

export interface Routine extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RoutineInterface;

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
    createRoutineWithId(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getActiveRoutinesByQueue(
      queueId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

    getRoutinesByAuthority(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

    getRoutinesByFunctionId(
      functionId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

    routineEscrowFund(
      routineId: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    routineEscrowWithdraw(
      routineId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    routineExists(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    routines(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[RoutineLib.RoutineStructOutput]>;

    updateRoutine(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createRoutineWithId(
    routineId: PromiseOrValue<string>,
    functionId: PromiseOrValue<string>,
    authority: PromiseOrValue<string>,
    params: PromiseOrValue<BytesLike>,
    schedule: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getActiveRoutinesByQueue(
    queueId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

  getRoutinesByAuthority(
    authority: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

  getRoutinesByFunctionId(
    functionId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

  routineEscrowFund(
    routineId: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  routineEscrowWithdraw(
    routineId: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  routineExists(
    routineId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  routines(
    routineId: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<RoutineLib.RoutineStructOutput>;

  updateRoutine(
    routineId: PromiseOrValue<string>,
    functionId: PromiseOrValue<string>,
    authority: PromiseOrValue<string>,
    params: PromiseOrValue<BytesLike>,
    schedule: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createRoutineWithId(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getActiveRoutinesByQueue(
      queueId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

    getRoutinesByAuthority(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

    getRoutinesByFunctionId(
      functionId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[], RoutineLib.RoutineStructOutput[]]>;

    routineEscrowFund(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    routineEscrowWithdraw(
      routineId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    routineExists(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    routines(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<RoutineLib.RoutineStructOutput>;

    updateRoutine(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "RoutineCreated(address,address,address,bytes)"(
      functionId?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      routineId?: PromiseOrValue<string> | null,
      params?: null
    ): RoutineCreatedEventFilter;
    RoutineCreated(
      functionId?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null,
      routineId?: PromiseOrValue<string> | null,
      params?: null
    ): RoutineCreatedEventFilter;

    "RoutineFund(address,address,uint256)"(
      functionId?: PromiseOrValue<string> | null,
      funder?: PromiseOrValue<string> | null,
      amount?: null
    ): RoutineFundEventFilter;
    RoutineFund(
      functionId?: PromiseOrValue<string> | null,
      funder?: PromiseOrValue<string> | null,
      amount?: null
    ): RoutineFundEventFilter;

    "RoutineWithdraw(address,address,uint256)"(
      functionId?: PromiseOrValue<string> | null,
      funder?: PromiseOrValue<string> | null,
      amount?: null
    ): RoutineWithdrawEventFilter;
    RoutineWithdraw(
      functionId?: PromiseOrValue<string> | null,
      funder?: PromiseOrValue<string> | null,
      amount?: null
    ): RoutineWithdrawEventFilter;
  };

  estimateGas: {
    createRoutineWithId(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getActiveRoutinesByQueue(
      queueId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoutinesByAuthority(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoutinesByFunctionId(
      functionId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    routineEscrowFund(
      routineId: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    routineEscrowWithdraw(
      routineId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    routineExists(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    routines(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateRoutine(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createRoutineWithId(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getActiveRoutinesByQueue(
      queueId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoutinesByAuthority(
      authority: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoutinesByFunctionId(
      functionId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    routineEscrowFund(
      routineId: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    routineEscrowWithdraw(
      routineId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    routineExists(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    routines(
      routineId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateRoutine(
      routineId: PromiseOrValue<string>,
      functionId: PromiseOrValue<string>,
      authority: PromiseOrValue<string>,
      params: PromiseOrValue<BytesLike>,
      schedule: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}