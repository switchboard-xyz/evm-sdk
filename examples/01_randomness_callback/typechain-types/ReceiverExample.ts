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
} from "./common";

export interface ReceiverExampleInterface extends utils.Interface {
  functions: {
    "callback(uint256)": FunctionFragment;
    "randomValue()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "callback" | "randomValue"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "callback",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "randomValue",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "callback", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "randomValue",
    data: BytesLike
  ): Result;

  events: {
    "NewRandomValue(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewRandomValue"): EventFragment;
}

export interface NewRandomValueEventObject {
  value: BigNumber;
}
export type NewRandomValueEvent = TypedEvent<
  [BigNumber],
  NewRandomValueEventObject
>;

export type NewRandomValueEventFilter = TypedEventFilter<NewRandomValueEvent>;

export interface ReceiverExample extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ReceiverExampleInterface;

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
    callback(
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    randomValue(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  callback(
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  randomValue(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    callback(
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    randomValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "NewRandomValue(uint256)"(value?: null): NewRandomValueEventFilter;
    NewRandomValue(value?: null): NewRandomValueEventFilter;
  };

  estimateGas: {
    callback(
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    randomValue(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    callback(
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    randomValue(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
