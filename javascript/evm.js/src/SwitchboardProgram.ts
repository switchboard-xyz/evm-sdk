import { AggregatorAccount } from "./accounts/AggregatorAccount.js";
import { FunctionAccount } from "./accounts/FunctionAccount.js";
import {
  Switchboard,
  Switchboard__factory,
  SwitchboardAttestationService,
  SwitchboardAttestationService__factory,
} from "./typechain-types/index.js";
import { sendTxnWithOptions } from "./sendTxnWithOptions.js";
import {
  AggregatorData,
  FunctionData,
  ISwitchboardProgram,
  SendContractMethod,
} from "./types.js";

import { Provider } from "@ethersproject/providers";
import {
  Contract,
  ContractTransaction,
  providers,
  Signer,
  Wallet,
} from "ethers";

/**
 * Creates and returns a Wallet using a private key and a JSON-RPC provider
 * @param privateKey - The private key of the wallet
 * @param rpc - The JSON-RPC provider
 * @returns Wallet
 *
 * @example
 * const wallet = getWallet('myPrivateKey', 'myRpcProvider');
 */
export function getWallet(privateKey: string, rpc: string) {
  const provider = new providers.JsonRpcProvider(rpc);
  return new Wallet(privateKey, provider);
}

/**
 * Creates and returns a Switchboard instance
 * @param address - The contract address of the Switchboard
 * @param signerOrProvider - The signer or provider used to interact with the contract
 * @returns Switchboard instance
 *
 * @example
 * const switchboard = getSwitchboard('myContractAddress', mySignerOrProvider);
 */
export function getSwitchboard(
  address: string,
  signerOrProvider: Signer | providers.Provider
): Switchboard {
  const factory = new Switchboard__factory(
    signerOrProvider instanceof Signer ? signerOrProvider : undefined
  );
  const contract = new Contract(address, factory.interface, signerOrProvider);
  return contract as Switchboard;
}

/**
 * Creates and returns a SwitchboardAttestationService instance
 * @param address - The contract address of the SwitchboardAttestationService
 * @param signerOrProvider - The signer or provider used to interact with the contract
 * @returns SwitchboardAttestationService instance
 *
 * @example
 * const attestationService = getSwitchboardAttestationService('myContractAddress', mySignerOrProvider);
 */
export function getSwitchboardAttestationService(
  address: string,
  signerOrProvider: Signer | providers.Provider
): SwitchboardAttestationService {
  const factory = new SwitchboardAttestationService__factory(
    signerOrProvider instanceof Signer ? signerOrProvider : undefined
  );
  const contract = new Contract(address, factory.interface, signerOrProvider);
  return contract as SwitchboardAttestationService;
}

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
export class SwitchboardProgram implements ISwitchboardProgram {
  constructor(
    public readonly sb: Switchboard,
    public readonly vs?: SwitchboardAttestationService
  ) {}

  private _addressPromise: Promise<string> | undefined = undefined;

  /**
   * A getter that returns a promise which resolves to the address of the signer.
   * If the address has already been fetched, it will be returned from the cache.
   * @returns Promise<string>
   *
   * @example
   * const signerAddress = await switchboard.address;
   */
  get address() {
    if (this._addressPromise) {
      return this._addressPromise;
    }

    this._addressPromise = this.sb.signer.getAddress().catch((err) => {
      this._addressPromise = undefined;
      return undefined;
    });
    return this._addressPromise;
  }

  /**
   * Static method to create and return a SwitchboardProgram instance.
   * @param signerOrProvider - The signer or provider used to interact with the contracts
   * @param switchboardAddress - The contract address of the Switchboard
   * @returns Promise<SwitchboardProgram>
   *
   * @example
   * const switchboardProgram = await SwitchboardProgram.load(mySignerOrProvider, 'mySwitchboardAddress');
   */
  public static async load(
    signerOrProvider: Signer | Provider,
    switchboardAddress: string
  ): Promise<SwitchboardProgram> {
    const sb = getSwitchboard(switchboardAddress, signerOrProvider);
    let vs: SwitchboardAttestationService | undefined = undefined;
    try {
      const attestationServiceAddress = await sb.switchboardAS();
      vs = getSwitchboardAttestationService(
        attestationServiceAddress,
        signerOrProvider
      );
    } catch {
      vs = undefined;
    }

    return new SwitchboardProgram(sb, vs);
  }

  /**
   * Returns a new instance of the SwitchboardProgram with a new signer.
   * @param signer - The new signer
   * @returns SwitchboardProgram
   *
   * @example
   * const newSwitchboardProgram = switchboardProgram.connect(newSigner);
   */
  public connect(signer: Signer): SwitchboardProgram {
    return new SwitchboardProgram(
      this.sb.connect(signer),
      this.vs?.connect(signer)
    );
  }

  /**
   * Checks if the SwitchboardProgram instance has an AttestationService.
   * Throws an error if the AttestationService is undefined.
   * @throws Error - if the AttestationService is undefined
   */
  hasAttestationService(): void {
    if (this.vs === undefined) {
      throw new Error(
        `You need to provide the attestation service address when initializing the SwitchboardProgram class in order to use this method`
      );
    }
  }

  /**
   * Sends a transaction to the Switchboard contract
   * @param methodName - The name of the contract method to be called
   * @param args - The arguments to pass to the contract method
   * @param options - The options to pass to the contract method
   * @returns Promise<ContractTransaction>
   *
   * @example
   * const transaction = await switchboardProgram.sendSbTxn('methodName', args, options);
   */
  sendSbTxn: SendContractMethod<Switchboard> = async (
    methodName,
    args,
    options
  ) => {
    return await sendTxnWithOptions(this.sb, methodName, args, options);
  };

  /**
   * Sends a transaction to the SwitchboardAttestationService contract
   * @param methodName - The name of the contract method to be called
   * @param args - The arguments to pass to the contract method
   * @param options - The options to pass to the contract method
   * @returns Promise<ContractTransaction>
   *
   * @example
   * const transaction = await switchboardProgram.sendVsTxn('methodName', args, options);
   */
  sendVsTxn: SendContractMethod<SwitchboardAttestationService> = async (
    methodName,
    args,
    options
  ) => {
    this.hasAttestationService();

    return await sendTxnWithOptions(this.vs, methodName, args, options);
  };

  /**
   * Polls a Switchboard contract transaction for an emitted event field
   * @param tx - The contract transaction to poll
   * @param field - An optional field name to extract from the event
   * @returns Promise<T>
   *
   * @example
   * const eventField = await switchboardProgram.pollTxnForSbEvent(tx, 'fieldName');
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
   * Polls a SwitchboardAttestationService contract transaction for an emitted event field
   * @param tx - The contract transaction to poll
   * @param field - An optional field name to extract from the event
   * @returns Promise<T>
   *
   * @example
   * const eventField = await switchboardProgram.pollTxnForVsEvent(tx, 'fieldName');
   */
  public async pollTxnForVsEvent<T>(
    tx: ContractTransaction,
    field?: string
  ): Promise<T> {
    const eventResult = await tx.wait().then((logs) => {
      const log = logs.logs[0];
      const sbLog = this.vs.interface.parseLog(log);
      return (field ? sbLog.args[field] : sbLog.args) as T;
    });
    return eventResult;
  }

  /**
   * Fetches Aggregator accounts for a given authority
   * @param authority - The authority for which to fetch the aggregator accounts
   * @returns Promise<AggregatorAccount[]>
   *
   * @example
   * const aggregatorAccounts = await switchboardProgram.fetchAggregatorAccounts('myAuthority');
   */
  public async fetchAggregatorAccounts(
    authority: string
  ): Promise<AggregatorAccount[]> {
    const aggregators: AggregatorAccount[] = [];

    const initEvents = await this.sb.queryFilter(
      this.sb.filters.AggregatorAccountInit(authority)
    );

    for (const event of initEvents) {
      const aggregatorAddress = event.args?.accountAddress;
      if (aggregatorAddress) {
        aggregators.push(new AggregatorAccount(this, aggregatorAddress));
      }
    }

    return aggregators;
  }

  /**
   * Fetches an array of AggregatorData instances for a given authority.
   * @param authority - The public key of the authority for which to fetch the AggregatorData.
   * @returns An array of AggregatorData instances.
   *
   * @example
   * // Fetch all aggregator data for a given authority
   * const authority = '0xabc123...'; // the public key of the authority
   * const aggregatorData = await switchboardProgram.fetchAggregators(authority);
   *
   * // Now you can loop through the aggregatorData array to access individual data.
   * for (const data of aggregatorData) {
   *    console.log(data);
   * }
   */
  public async fetchAggregators(authority: string): Promise<AggregatorData[]> {
    const aggregatorAccounts = await this.fetchAggregatorAccounts(authority);
    return await Promise.all(
      aggregatorAccounts.map(
        (aggregatorAccount): Promise<AggregatorData> =>
          aggregatorAccount.loadData()
      )
    );
  }

  /**
   * Fetches an array of FunctionAccount instances for a given authority.
   * @param authority - The public key of the authority for which to fetch FunctionAccount instances.
   * @returns An array of FunctionAccount instances.
   *
   * @example
   * // Fetch all function accounts for a given authority
   * const authority = '0xabc123...'; // the public key of the authority
   * const functionAccounts = await switchboardProgram.fetchFunctionAccounts(authority);
   *
   * // Now you can loop through the functionAccounts array to access individual accounts.
   * for (const account of functionAccounts) {
   *    console.log(account);
   * }
   */
  public async fetchFunctionAccounts(
    authority: string
  ): Promise<FunctionAccount[]> {
    this.hasAttestationService();

    const functions: FunctionAccount[] = [];

    const initEvents = await this.sb.queryFilter(
      this.vs.filters.FunctionAccountInit(authority)
    );

    for (const event of initEvents) {
      const functionAddress = event.args?.accountAddress;
      if (functionAddress) {
        functions.push(new FunctionAccount(this, functionAddress));
      }
    }

    return functions;
  }

  /**
   * Fetches an array of FunctionData instances for a given authority.
   * @param authority - The public key of the authority for which to fetch FunctionData.
   * @returns An array of FunctionData instances.
   *
   * @example
   * // Fetch all function data for a given authority
   * const authority = '0xabc123...'; // the public key of the authority
   * const functionData = await switchboardProgram.fetchFunctions(authority);
   *
   * // Now you can loop through the functionData array to access individual data.
   * for (const data of functionData) {
   *    console.log(data);
   * }
   */
  public async fetchFunctions(authority: string): Promise<FunctionData[]> {
    const functionAccounts = await this.fetchFunctionAccounts(authority);
    return await Promise.all(
      functionAccounts.map(
        (functionAccount): Promise<FunctionData> => functionAccount.loadData()
      )
    );
  }
}
