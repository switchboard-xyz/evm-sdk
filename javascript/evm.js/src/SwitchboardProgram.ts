import { AggregatorAccount } from "./accounts/AggregatorAccount.js";
import { LoadedFunctionAccount } from "./accounts/FunctionAccount.js";
import type { SwitchboardPushReceiver } from "./switchboard-push-types/index.js";
import { SwitchboardPushReceiver__factory } from "./switchboard-push-types/index.js";
import type { Switchboard } from "./switchboard-types/index.js";
import { Switchboard__factory } from "./switchboard-types/index.js";
import { parseMrEnclave } from "./parseMrEnclave.js";
import { sendTxnWithOptions } from "./sendTxnWithOptions.js";
import type {
  AggregatorData,
  ISwitchboardProgram,
  SendContractMethod,
} from "./types.js";

import type { Provider } from "@ethersproject/providers";
import type { IEvmNetworkConfig } from "@switchboard-xyz/common/networks";
import { getSupportedEvmChainId } from "@switchboard-xyz/common/networks";
import type { ContractTransaction, Signer } from "ethers";
import { BigNumber, providers, utils, Wallet } from "ethers";

export type Aggregator = AggregatorData & { address: string };

export { isSupportedChainId } from "@switchboard-xyz/common/networks";

export function getEvmConfig(chainId: number): IEvmNetworkConfig {
  return getSupportedEvmChainId(chainId);
}

/**
 * Creates and returns a Wallet using a private key and a JSON-RPC provider
 * @param privateKey - The private key of the wallet
 * @param rpcUrl - The RPC url.
 * @returns Wallet
 *
 *
 * const wallet = getWallet('0xMyPrivateKey', 'https://rpc.com');
 */
export function getWallet(privateKey: string, rpcUrl: string) {
  const provider = new providers.JsonRpcProvider(rpcUrl);
  return new Wallet(privateKey, provider);
}

/**
 * Creates and returns a Switchboard instance
 * @param address - The contract address of the Switchboard
 * @param signerOrProvider - The signer or provider used to interact with the contract
 * @returns Switchboard instance
 *
 *
 * const switchboard = getSwitchboard('0xSwitchboardSolContractAddress', mySignerOrProvider);
 */
export function getSwitchboard(
  address: string,
  signerOrProvider: Signer | providers.Provider
): Switchboard {
  return Switchboard__factory.connect(address, signerOrProvider);
}

/**
 * Creates and returns a Switchboard Push instance
 * @param address - The contract address of the Switchboard
 * @param signerOrProvider - The signer or provider used to interact with the contract
 * @returns SwitchboardPushReceiver instance
 *
 *
 * const switchboard = getSwitchboardPushReceiver('0xSwitchboardSolContractAddress', mySignerOrProvider);
 */
export function getSwitchboardPushReceiver(
  address: string,
  signerOrProvider: Signer | providers.Provider
): SwitchboardPushReceiver {
  return SwitchboardPushReceiver__factory.connect(address, signerOrProvider);
}

export async function getSbPushReceiverFromProvider(
  provider: providers.Provider,
  _address?: string
): Promise<SwitchboardPushReceiver> {
  const address = _address
    ? _address
    : await (async () => {
        const { chainId } = await provider.getNetwork();
        const config = getSupportedEvmChainId(chainId);
        return config.sbPushOracle;
      })();

  return SwitchboardPushReceiver__factory.connect(address, provider);
}

/**
 * Get switchboard push receiver feeds as Aggregators
 */
export async function getSwitchboardPushReceiverFeeds(
  switchboardPushReceiver: SwitchboardPushReceiver
): Promise<Aggregator[]> {
  const feeds = await switchboardPushReceiver.getAllFeeds();
  const admin = await switchboardPushReceiver.owner();
  const functionId = await switchboardPushReceiver.functionId();
  let latestTimestamp = BigNumber.from(0);

  const results = feeds.map((feed) => {
    const result = {
      value: feed.latestResult.value,
      timestamp: feed.latestResult.updatedAt,
      oracleAddress: functionId,
    };

    const config = {
      batchSize: BigNumber.from(1),
      minUpdateDelaySeconds: BigNumber.from(30),
      minOracleResults: BigNumber.from(1),
      varianceThreshold: BigNumber.from(1).mul(BigNumber.from(10).pow(17)),
      minJobResults: BigNumber.from(1),
      forceReportPeriod: BigNumber.from(0),
    };

    const data = {
      address: feed.feedId,
      name: utils.parseBytes32String(feed.feedName),
      authority: admin,
      latestResult: result,
      config,
      jobsHash: "",
      queueId: "",
      balanceLeftForInterval: BigNumber.from(0),
      nextIntervalRefreshTime: BigNumber.from(0),
      intervalId: BigNumber.from(0),
      balance: BigNumber.from(0),
      historyEnabled: Boolean(feed.historyEnabled),
      latestResultFailed: Boolean(feed.latestResultFailed),
    };

    if (feed.latestResult.updatedAt.gt(latestTimestamp)) {
      latestTimestamp = feed.latestResult.updatedAt;
    }

    // Not ideal, but I really don't want to copy the jank typechain-types types (object & array union)
    return data;
  });

  // check if latestResult is stale, if not set the timestamp to the latest timestamp
  for (const result of results) {
    if (!result.latestResultFailed) {
      result.latestResult.timestamp = latestTimestamp;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results as any;
}

/**
 * The SwitchboardProgram class provides a high-level API to interact with the {@link Switchboard} and {@link SwitchboardAttestationService} smart contracts on the EVM.
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
export class SwitchboardProgram implements ISwitchboardProgram {
  constructor(
    // An instance of the {@link Switchboard} contract.
    public readonly sb: Switchboard
  ) {}

  private _addressPromise: Promise<string> | undefined = undefined;

  private _chainIdPromise: Promise<number> | undefined = undefined;

  private _sbPushOraclePromise: Promise<SwitchboardPushReceiver> | undefined =
    undefined;

  public get chainId(): Promise<number> {
    if (this._chainIdPromise) {
      return this._chainIdPromise;
    }

    this._chainIdPromise = this.sb.provider
      .getNetwork()
      .then(({ chainId }) => chainId)
      .catch((err) => {
        this._chainIdPromise = undefined;
        throw err;
      });
    return this._chainIdPromise;
  }

  public get sbPushOracle(): Promise<SwitchboardPushReceiver> {
    if (this._sbPushOraclePromise) {
      return this._sbPushOraclePromise;
    }

    this._sbPushOraclePromise = this.chainId
      .then((chainId) => {
        const config = getSupportedEvmChainId(chainId);
        return SwitchboardPushReceiver__factory.connect(
          config.sbPushOracle,
          this.sb.provider
        );
      })
      .catch((err) => {
        this._sbPushOraclePromise = undefined;
        throw err;
      });
    return this._sbPushOraclePromise;
  }

  /**
   * A getter that returns a promise which resolves to the address of the signer.
   * If the address has already been fetched, it will be returned from the cache.
   * @returns Promise<string>
   *
   * ```typescript
   * const signerAddress = await switchboard.address;
   * ```
   */
  get address() {
    if (this._addressPromise) {
      return this._addressPromise;
    }

    this._addressPromise = this.sb.signer.getAddress().catch((err) => {
      this._addressPromise = undefined;
      throw err;
    });
    return this._addressPromise;
  }

  /**
   * Static method to create and return a SwitchboardProgram instance.
   * @param signerOrProvider - The signer or provider used to interact with the contracts
   * @throws if chainId is not supported by Switchboard
   * @returns Promise<SwitchboardProgram>
   *
   * ```typescript
   * const switchboardProgram = await SwitchboardProgram.load(mySignerOrProvider, '0xMySwitchboardAddress');
   * ```
   */
  public static async fromProvider(
    provider: Provider
  ): Promise<SwitchboardProgram> {
    const { chainId } = await provider.getNetwork();
    const config = getSupportedEvmChainId(chainId);
    const sb = getSwitchboard(config.address, provider);
    return new SwitchboardProgram(sb);
  }

  /**
   * Static method to create and return a SwitchboardProgram instance.
   * @param signerOrProvider - The signer or provider used to interact with the contracts
   * @param switchboardAddress - The contract address of the Switchboard
   * @returns Promise<SwitchboardProgram>
   *
   * ```typescript
   * const switchboardProgram = await SwitchboardProgram.load(mySignerOrProvider, '0xMySwitchboardAddress');
   * ```
   */
  public static async load(
    signerOrProvider: Signer | Provider,
    switchboardAddress: string
  ): Promise<SwitchboardProgram> {
    const sb = getSwitchboard(switchboardAddress, signerOrProvider);
    return new SwitchboardProgram(sb);
  }

  /**
   * Returns a new instance of the SwitchboardProgram with a new signer.
   * @param signer - The new signer
   * @returns SwitchboardProgram
   *
   * ```typescript
   * const newSwitchboardProgram = switchboardProgram.connect(newSigner);
   * ```
   */
  public connect(signer: Signer): SwitchboardProgram {
    return new SwitchboardProgram(this.sb.connect(signer));
  }

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
  sendSbTxn: SendContractMethod<Switchboard> = async (
    methodName,
    args,
    options
  ) => {
    return await sendTxnWithOptions(this.sb, methodName, args, options);
  };

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
  public async pollTxnForSbEvent<T>(
    tx: ContractTransaction,
    field?: string
  ): Promise<T> {
    const eventResult = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = this.sb.interface.parseLog(log);
      return (field ? sbLog.args[field] : sbLog.args) as T;
    });
    return eventResult;
  }

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
  public async fetchFunctions(): Promise<LoadedFunctionAccount[]> {
    const [ids, states] = await this.sb.getAllFunctions();
    return ids.map(
      (_, i) => new LoadedFunctionAccount(this, ids[i], states[i])
    );
  }

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
  public async fetchFunctionsByAuthority(
    _authority?: string
  ): Promise<LoadedFunctionAccount[]> {
    const authority = _authority ?? (await this.address);
    const [ids, states] = await this.sb.getFunctionsByAuthority(authority);
    return ids.map(
      (_, i) => new LoadedFunctionAccount(this, ids[i], states[i])
    );
  }

  /**
   * Fetch the MrEnclave measurement for a given enclave authority address.
   * @param enclaveAuthority - The address of the enclave authority to fetch a measurement for.
   * @returns A enclave authorities MrEnclave measurement
   *
   * ```typescript
   * const mrEnclave = await switchboardProgram.getEnclaveAuthorityMrEnclave('0xMyEnclaveAuthority');
   * ```
   */
  public async getEnclaveAuthorityMrEnclave(
    enclaveAuthority: string
  ): Promise<Uint8Array> {
    const enclaveId = await this.sb.enclaveSignerToEnclaveId(enclaveAuthority);
    const enclave = await this.sb.enclaves(enclaveId);
    return parseMrEnclave(enclave.mrEnclave);
  }
}
