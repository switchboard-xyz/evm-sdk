import { BigUtils } from "@switchboard-xyz/common";
import Big from "big.js";
import ethers from "ethers";

/**
 * The SBDecimal class provides methods for creating and manipulating decimal numbers
 * in the Switchboard environment. It offers utilities for converting to Big and BigNumber
 * formats, and instantiating SBDecimal objects from Big format or a generic object.
 *
 * @property {string} mantissa - Represents the significant digits.
 * @property {number} scale - The exponent in base 10.
 * @property {boolean} neg - Indicates whether the number is negative.
 *
 * ```ts
 * // Creating an instance of SBDecimal
 * let sbDec = new SBDecimal('123', 2, false);
 * console.log(sbDec); // SBDecimal { mantissa: '123', scale: 2, neg: false }
 *
 * // Converting SBDecimal to Big number
 * let bigNumber = sbDec.toBig();
 * console.log(bigNumber.toString()); // '1.23'
 *
 * // Converting SBDecimal to BigNumber
 * let bigNum = sbDec.toBigNumber();
 * console.log(bigNum.toString()); // '1230000000000000000'
 *
 * // Creating a SBDecimal from a Big number
 * let big = new Big(1.23);
 * let sbDecFromBig = SBDecimal.fromBig(big);
 * console.log(sbDecFromBig); // SBDecimal { mantissa: '123', scale: 2, neg: false }
 *
 * // Creating a SBDecimal from an object
 * let sbDecObj = {mantissa: '456', scale: 3, neg: true};
 * let sbDecFromObj = SBDecimal.fromObj(sbDecObj);
 * console.log(sbDecFromObj); // SBDecimal { mantissa: '456', scale: 3, neg: true }
 * ```
 */
export class SBDecimal {
  constructor(
    readonly mantissa: string,
    readonly scale: number,
    readonly neg: boolean
  ) {}

  /**
   * Converts the SBDecimal to a Big number.
   *
   * @returns {Big} - The Big representation of the SBDecimal.
   *
   * ```ts
   * const sbDec = new SBDecimal('123', 2, false);
   * const big = sbDec.toBig();
   * ```
   */
  toBig(): Big {
    const oldDp = Big.DP;
    Big.DP = 18;
    let result = new Big(this.mantissa);
    if (this.neg === true) {
      result = result.mul(-1);
    }
    const TEN = new Big(10);
    result = BigUtils.safeDiv(result, TEN.pow(this.scale));
    Big.DP = oldDp;
    return result;
  }

  /**
   * Converts the SBDecimal to a signed BigNumber.
   *
   * @returns {ethers.BigNumber} - The BigNumber representation of the SBDecimal.
   *
   * ```ts
   * const sbDec = new SBDecimal('123', 2, false);
   * const bigNum = sbDec.toBigNumber();
   * ```
   */
  toBigNumber(): ethers.BigNumber {
    let mantissa = this.mantissa;
    let scale = this.scale;
    while (scale < 18) {
      mantissa += "0";
      scale++;
    }
    return ethers.BigNumber.from(mantissa).mul(this.neg ? -1 : 1);
  }

  /**
   * Static method to create a SBDecimal from a Big number.
   *
   * @param {Big} val - The Big number to convert into a SBDecimal.
   * @returns {SBDecimal} - The created SBDecimal object.
   *
   * ```ts
   * const big = new Big(123.45);
   * const sbDec = SBDecimal.fromBig(big);
   * ```
   */
  static fromBig(val: Big): SBDecimal {
    const value = val.c.slice();
    const e = val.e + 1;
    while (value.length - e > 18) {
      value.pop();
    }

    // Aptos decimals cannot have a negative scale
    while (value.length - e < 0) {
      value.push(0);
    }

    return new SBDecimal(value.join(""), value.length - e, val.s === -1);
  }

  /**
   * Static method to create a SBDecimal from a generic object.
   * The object must contain the properties 'mantissa', 'scale', and 'neg'.
   *
   * @param {Object} obj - The object to convert into a SBDecimal.
   * @returns {SBDecimal} - The created SBDecimal object.
   *
   * ```ts
   * const obj = {mantissa: '123', scale: 2, neg: false};
   * const sbDec = SBDecimal.fromObj(obj);
   * ```
   */
  static fromObj(obj: Object): SBDecimal {
    const properties = ["mantissa", "scale", "neg"];
    properties.forEach((p) => {
      if (!(p in obj)) {
        throw new Error(`Object is missing property ${p}`);
      }
    });

    return new SBDecimal(obj["mantissa"], obj["scale"], obj["neg"]);
  }
}
