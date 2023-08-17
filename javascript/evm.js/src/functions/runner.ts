import type { EVMFunctionResult, FunctionResult } from "./functionResult.js";
import { emit } from "./functionResult.js";
import { prepare } from "./prepare.js";

import { BN } from "@switchboard-xyz/common";
import crypto from "crypto";
import type { PopulatedTransaction } from "ethers";
import { utils, Wallet } from "ethers";
// @NOTE must be polyfilled in the front-end if used there
import fs from "fs";

export class FunctionRunner {
  public readonly verifyingContract: string;
  public readonly functionId: string;
  readonly enclaveWallet: Wallet;
  readonly chainId: number;

  // encodePacked params sets for the function call
  public readonly rawParams: Array<string>;

  // corresponding callIds to each param set
  public readonly callIds: Array<string>;

  constructor(
    verifyingContract?: string,
    enclaveWallet?: Wallet,
    chainId?: number
  ) {
    this.verifyingContract = verifyingContract;
    this.enclaveWallet = enclaveWallet;
    this.chainId = chainId;

    /* check if we're in node.js */
    if (typeof window !== "undefined") {
      this.functionId = "";
      this.rawParams = [];
      this.callIds = [];
    } else if (typeof process !== "undefined") {
      this.enclaveWallet = this.enclaveWallet ?? Wallet.createRandom();

      this.verifyingContract =
        this.verifyingContract ?? process.env.VERIFYING_CONTRACT;
      if (this.verifyingContract === undefined) {
        throw new Error("Missing VERIFYING_CONTRACT environment variable");
      }

      this.functionId = this.functionId ?? process.env.FUNCTION_KEY;
      if (this.functionId === undefined) {
        throw new Error("Missing FUNCTION_KEY environment variable");
      }

      this.chainId =
        this.chainId ??
        (process.env.CHAIN_ID && parseInt(process.env.CHAIN_ID));
      if (this.chainId === undefined) {
        throw new Error("Missing CHAIN_ID environment variable");
      }

      // turn raw sets of params into byte arrays
      const rawParams = process.env.FUNCTION_PARAMS;
      if (rawParams !== undefined) {
        // Parse the JSON string into an array of strings
        const paramsSetsRaw: number[][] = JSON.parse(rawParams);

        // Convert each string to Uint8Array
        const paramSetsBytes: Uint8Array[] = paramsSetsRaw.map((v) =>
          Uint8Array.from(v)
        );

        // Convert each Uint8Array to hex string
        this.rawParams = paramSetsBytes.map((v) => utils.hexlify(v));
      } else {
        this.rawParams = [];
      }

      const callIds = process.env.FUNCTION_CALL_IDS;
      if (callIds !== undefined) {
        // Parse the JSON string into an array of strings
        const functionCallIdsJson: number[][] = JSON.parse(callIds);

        // Convert each string to Uint8Array
        const functionCallIdsBytes: Uint8Array[] = functionCallIdsJson.map(
          (v) => Uint8Array.from(v)
        );

        // Convert each Uint8Array to hex string
        this.callIds = functionCallIdsBytes.map((v) => utils.hexlify(v));
      } else {
        this.callIds = [];
      }
    }
  }

  /**
   * @param paramType - An array of strings or ethers ParamTypes
   * @example
   * ```typescript
   * const runner = new FunctionRunner();
   * const params = runner.params(["uint256", "uint256"]);
   * console.log(params);
   * // [
   * //   {
   * //     callId: "0x000000
   * //     params: [BigNumber(1), BigNumber(2)]
   * //   },
   * //   {
   * //     callId: "0x000000
   * //     params: [BigNumber(3), BigNumber(4)]
   * //   }
   * // ]
   * ```
   */
  params(
    paramType: ReadonlyArray<string | utils.ParamType>
  ): Array<{ callId: string; params: utils.Result | undefined }> {
    return this.rawParams.map((v, i) => {
      let result: utils.Result | undefined;
      try {
        result = utils.defaultAbiCoder.decode(paramType, v);
      } catch (e) {
        console.error(e);
      }
      return {
        callId: this.callIds[i],
        params: result,
      };
    });
  }

  /**
   * @param populatedTxn - An array of ethers PopulatedTransaction
   * @param callIds - An array of callIds to handle (defaults to all callIds / none if no params)
   * @param expirationTimeSeconds - The expiration time in seconds
   * @param gasLimit - The gas limit for the transaction
   * @example
   * ```typescript
   * const runner = new FunctionRunner();
   * const txns = await runner.emit(
   *   [contractFunctonTx1, contractFunctonTx2],
   *   [] // defaults to handling all call ids
   *   Math.floor(Date.now() / 1000) + 60, // 60 seconds from run time
   *   1_000_000 // 1 million gas limit,
   * );
   * ```
   */
  async emit(
    populatedTxn: PopulatedTransaction[],
    callIds?: string[],
    expirationTimeSeconds?: number,
    gasLimit?: string
  ) {
    const preparedTxns = await prepare(
      this.verifyingContract,
      this.enclaveWallet, // payer
      this.enclaveWallet, // signer
      populatedTxn,
      this.chainId,
      this.enclaveWallet, // from override
      expirationTimeSeconds,
      gasLimit
    );

    const txs = [];
    const signatures: Array<Uint8Array> = [];
    await Promise.all(
      preparedTxns.map(async (tx, i) => {
        txs.push({
          value: tx.transaction.value.toString(),
          gasLimit: tx.transaction.gasLimit.toString(),
          to: utils.arrayify(tx.transaction.to),
          from: utils.arrayify(tx.transaction.from),
          data: utils.arrayify(tx.transaction.data),
          expirationTimeSeconds: new BN(
            tx.transaction.expirationTimeSeconds.toString()
          ),
        });
        signatures.push(utils.arrayify(tx.signature));
      })
    );

    // Add checksums for resolved call ids
    let checksums: Array<Uint8Array> = [];
    if (callIds && callIds.length) {
      // create a map of callId value to index
      const cids = this.callIds.reduce((acc, v, i) => {
        acc[v] = i;
        return acc;
      }, {});

      // use that index to get the corresponding param for any resolved callIds
      checksums = callIds.map((v) =>
        utils.arrayify(utils.keccak256(this.rawParams[cids[v]]))
      );
    } else {
      // if callIds aren't explicitly addressed
      checksums = this.rawParams.map((v) => utils.arrayify(utils.keccak256(v)));
    }

    const resolvedCallIds = (callIds ?? this.callIds).map((v) => {
      // only add resolved params to checksums list
      checksums.push(utils.arrayify(utils.keccak256(v)));
      return utils.arrayify(v);
    });

    const evmChainResult: EVMFunctionResult = {
      txs,

      // convert byte arrays to arrays of numbers - this is for JSON serialization
      signatures: signatures.map((s) => Array.from(s)),
      checksums: checksums.map((c) => Array.from(c)),
      call_ids: resolvedCallIds.map((c) => Array.from(c)),
    };

    // get sgx quote
    try {
      fs.accessSync("/dev/attestation/quote");
    } catch (err) {
      console.log("WARNING: NOT IN TEE / NO QUOTE GENERATED");
    }
    const hash = crypto.createHash("sha256");
    hash.update(this.enclaveWallet.address);
    const data = Array.from(hash.digest());
    data.length = 64;
    let quote: Buffer;
    try {
      fs.writeFileSync("/dev/attestation/user_report_data", Buffer.from(data));
      quote = fs.readFileSync("/dev/attestation/quote");
      console.log(
        `MR ENCLAVE: ${quote.slice(432, 432 + 32).toString("base64")}`
      );
    } catch (e) {
      quote = Buffer.from([]);
    }

    const functionResult: FunctionResult = {
      version: 1,
      quote: Array.from(quote),
      fn_key: Array.from(utils.arrayify(this.functionId)),
      signer: Array.from(utils.arrayify(this.enclaveWallet.address)),
      fn_request_key: resolvedCallIds.length
        ? Array.from(resolvedCallIds[0])
        : [],
      fn_request_hash: checksums.length ? Array.from(checksums[0]) : [],
      chain_result_info: evmChainResult,
    };

    // print the result to stdout
    emit(functionResult);
  }
}
