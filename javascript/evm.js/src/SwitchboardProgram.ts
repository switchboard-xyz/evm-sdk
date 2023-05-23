import {
  Switchboard,
  Switchboard__factory,
  SwitchboardAttestationService,
  SwitchboardAttestationService__factory,
} from "./typechain-types/index.js";
import { type EstimateGasFunctions, sendTxnWithGas } from "./sendTxnWithGas.js";

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

export class SwitchboardProgram {
  constructor(
    public readonly sb: Switchboard,
    public readonly vs?: SwitchboardAttestationService
  ) {}

  public load(
    signerOrProvider: Signer | Provider,
    switchboardAddress: string,
    attestationServiceAddress?: string
  ): SwitchboardProgram {
    const sb = getSwitchboard(switchboardAddress, signerOrProvider);
    const vs = attestationServiceAddress
      ? getSwitchboardAttestationService(
          attestationServiceAddress,
          signerOrProvider
        )
      : undefined;

    return new SwitchboardProgram(sb, vs);
  }

  /** Return a new instance of the SwitchboardProgram with a new signer */
  public connect(signer: Signer): SwitchboardProgram {
    return new SwitchboardProgram(
      this.sb.connect(signer),
      this.vs?.connect(signer)
    );
  }

  private hasAttestationService() {
    if (this.vs === undefined) {
      throw new Error(
        `You need to provide the attestation service address when initializing the SwitchboardProgram class in order to use this method`
      );
    }
  }

  public async sendSbTxnWithGas<
    K extends keyof T & keyof EstimateGasFunctions,
    T extends Contract = Switchboard
  >(
    gasFactor: number,
    methodName: K,
    ...args: Parameters<T[K]>
  ): Promise<ReturnType<T[K]>> {
    return await sendTxnWithGas(this.sb, gasFactor, methodName as any, ...args);
  }

  public async sendVsTxnWithGas<
    K extends keyof T & keyof EstimateGasFunctions,
    T extends Contract = SwitchboardAttestationService
  >(
    gasFactor: number,
    methodName: K,
    ...args: Parameters<T[K]>
  ): Promise<ReturnType<T[K]>> {
    this.hasAttestationService();

    return await sendTxnWithGas(this.vs, gasFactor, methodName as any, ...args);
  }
}
