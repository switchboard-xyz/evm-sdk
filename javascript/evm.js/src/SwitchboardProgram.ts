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
import { Contract, providers, Signer, Wallet } from "ethers";

export function getWallet(privateKey: string, rpc: string) {
  const provider = new providers.JsonRpcProvider(rpc);
  return new Wallet(privateKey, provider);
}

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
 * Wrapper class for the Switchboard smart contracts.
 *
 * This class provides an interface to interact with the Switchboard EVM smart contracts.
 *
 * Basic usage example:
 *
 * ```ts
 * import { SwitchboardProgram } from '@switchboard-xyz/evm.js';
 *
 * const switchboard = SwitchboardProgram.load(
 *    signer, // signerOrProvider
 *    "0x73d6C66874e570f058834cAA666b2c352F1C792D", // switchboard contract address
 *    "0x1bAB46734e02d25D9dF5EE725c0646b39C0c5224" // attestation contract address
 * );
 * ```
 */
export class SwitchboardProgram implements ISwitchboardProgram {
  constructor(
    public readonly sb: Switchboard,
    public readonly vs?: SwitchboardAttestationService
  ) {}

  private _addressPromise: Promise<string> | undefined = undefined;

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

  /** Return a new instance of the SwitchboardProgram with a new signer */
  public connect(signer: Signer): SwitchboardProgram {
    return new SwitchboardProgram(
      this.sb.connect(signer),
      this.vs?.connect(signer)
    );
  }

  hasAttestationService() {
    if (this.vs === undefined) {
      throw new Error(
        `You need to provide the attestation service address when initializing the SwitchboardProgram class in order to use this method`
      );
    }
  }

  sendSbTxn: SendContractMethod<Switchboard> = async (
    methodName,
    args,
    options
  ) => {
    return await sendTxnWithOptions(this.sb, methodName, args, options);
  };

  sendVsTxn: SendContractMethod<SwitchboardAttestationService> = async (
    methodName,
    args,
    options
  ) => {
    this.hasAttestationService();

    return await sendTxnWithOptions(this.vs, methodName, args, options);
  };

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

  public async fetchAggregators(authority: string): Promise<AggregatorData[]> {
    const aggregatorAccounts = await this.fetchAggregatorAccounts(authority);
    return await Promise.all(
      aggregatorAccounts.map(
        (aggregatorAccount): Promise<AggregatorData> =>
          aggregatorAccount.loadData()
      )
    );
  }

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

  public async fetchFunctions(authority: string): Promise<FunctionData[]> {
    const functionAccounts = await this.fetchFunctionAccounts(authority);
    return await Promise.all(
      functionAccounts.map(
        (functionAccount): Promise<FunctionData> => functionAccount.loadData()
      )
    );
  }
}
