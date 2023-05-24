import { BigUtils } from "@switchboard-xyz/common";
import Big from "big.js";
import * as ethers from "ethers";

export class SBDecimal {
  constructor(
    readonly mantissa: string,
    readonly scale: number,
    readonly neg: boolean
  ) {}

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

  // to signed big number
  toBigNumber(): ethers.BigNumber {
    let mantissa = this.mantissa;
    let scale = this.scale;
    while (scale < 18) {
      mantissa += "0";
      scale++;
    }
    return ethers.BigNumber.from(mantissa).mul(this.neg ? -1 : 1);
  }

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
