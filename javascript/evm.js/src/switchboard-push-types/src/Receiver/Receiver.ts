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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace ReceiverLib {
  export type ResultStruct = {
    value: PromiseOrValue<BigNumberish>;
    startedAt: PromiseOrValue<BigNumberish>;
    updatedAt: PromiseOrValue<BigNumberish>;
  };

  export type ResultStructOutput = [BigNumber, BigNumber, BigNumber] & {
    value: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
  };

  export type FeedStruct = {
    feedId: PromiseOrValue<string>;
    feedName: PromiseOrValue<BytesLike>;
    latestIntervalId: PromiseOrValue<BigNumberish>;
    latestResult: ReceiverLib.ResultStruct;
    historyEnabled: PromiseOrValue<boolean>;
    latestResultFailed: PromiseOrValue<boolean>;
  };

  export type FeedStructOutput = [
    string,
    string,
    BigNumber,
    ReceiverLib.ResultStructOutput,
    boolean,
    boolean
  ] & {
    feedId: string;
    feedName: string;
    latestIntervalId: BigNumber;
    latestResult: ReceiverLib.ResultStructOutput;
    historyEnabled: boolean;
    latestResultFailed: boolean;
  };
}

export interface ReceiverInterface extends utils.Interface {
  functions: {
    "callback(bytes32[],int256[],uint256)": FunctionFragment;
    "deployFeedAdapter(address,string,string)": FunctionFragment;
    "failureCallback(bytes32[])": FunctionFragment;
    "feedNames()": FunctionFragment;
    "feeds(bytes32)": FunctionFragment;
    "getAllFeeds()": FunctionFragment;
    "getLatestResult(address)": FunctionFragment;
    "latestTimestamp()": FunctionFragment;
    "results(bytes32,uint80)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "callback"
      | "deployFeedAdapter"
      | "failureCallback"
      | "feedNames"
      | "feeds"
      | "getAllFeeds"
      | "getLatestResult"
      | "latestTimestamp"
      | "results"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "callback",
    values: [
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deployFeedAdapter",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "failureCallback",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(functionFragment: "feedNames", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeds",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllFeeds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestResult",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "latestTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "results",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "callback", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployFeedAdapter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "failureCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feedNames", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllFeeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "results", data: BytesLike): Result;

  events: {};
}

export interface Receiver extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ReceiverInterface;

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
      _feedNames: PromiseOrValue<BytesLike>[],
      values: PromiseOrValue<BigNumberish>[],
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployFeedAdapter(
      feedId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    failureCallback(
      _feedNames: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feedNames(overrides?: CallOverrides): Promise<[string[]]>;

    feeds(
      feedName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[ReceiverLib.FeedStructOutput]>;

    getAllFeeds(
      overrides?: CallOverrides
    ): Promise<[ReceiverLib.FeedStructOutput[]]>;

    getLatestResult(
      feedId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    latestTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    results(
      feedName: PromiseOrValue<BytesLike>,
      intervalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[ReceiverLib.ResultStructOutput]>;
  };

  callback(
    _feedNames: PromiseOrValue<BytesLike>[],
    values: PromiseOrValue<BigNumberish>[],
    timestamp: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployFeedAdapter(
    feedId: PromiseOrValue<string>,
    name: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  failureCallback(
    _feedNames: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feedNames(overrides?: CallOverrides): Promise<string[]>;

  feeds(
    feedName: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<ReceiverLib.FeedStructOutput>;

  getAllFeeds(
    overrides?: CallOverrides
  ): Promise<ReceiverLib.FeedStructOutput[]>;

  getLatestResult(
    feedId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  results(
    feedName: PromiseOrValue<BytesLike>,
    intervalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<ReceiverLib.ResultStructOutput>;

  callStatic: {
    callback(
      _feedNames: PromiseOrValue<BytesLike>[],
      values: PromiseOrValue<BigNumberish>[],
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    deployFeedAdapter(
      feedId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    failureCallback(
      _feedNames: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    feedNames(overrides?: CallOverrides): Promise<string[]>;

    feeds(
      feedName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<ReceiverLib.FeedStructOutput>;

    getAllFeeds(
      overrides?: CallOverrides
    ): Promise<ReceiverLib.FeedStructOutput[]>;

    getLatestResult(
      feedId: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        value: BigNumber;
        timestamp: BigNumber;
        updatedAt: BigNumber;
        intervalId: BigNumber;
      }
    >;

    latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    results(
      feedName: PromiseOrValue<BytesLike>,
      intervalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<ReceiverLib.ResultStructOutput>;
  };

  filters: {};

  estimateGas: {
    callback(
      _feedNames: PromiseOrValue<BytesLike>[],
      values: PromiseOrValue<BigNumberish>[],
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployFeedAdapter(
      feedId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    failureCallback(
      _feedNames: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feedNames(overrides?: CallOverrides): Promise<BigNumber>;

    feeds(
      feedName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllFeeds(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestResult(
      feedId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    results(
      feedName: PromiseOrValue<BytesLike>,
      intervalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    callback(
      _feedNames: PromiseOrValue<BytesLike>[],
      values: PromiseOrValue<BigNumberish>[],
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployFeedAdapter(
      feedId: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    failureCallback(
      _feedNames: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feedNames(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeds(
      feedName: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllFeeds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLatestResult(
      feedId: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    latestTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    results(
      feedName: PromiseOrValue<BytesLike>,
      intervalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
