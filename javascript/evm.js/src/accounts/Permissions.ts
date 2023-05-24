import { SwitchboardProgram } from "../SwitchboardProgram.js";
import { ISwitchboardProgram, TransactionOptions } from "../types.js";

import { BigNumber, ContractTransaction } from "ethers";

export interface PermissionInitParams {
  grantee: string;
  granter: string;
  permission: number;
  enable?: boolean;
}

export class Permissions {
  private constructor() {}

  /**
   * Initialize a Oracle
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param params Oracle initialization params
   */
  public static async set(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number,
    enable?: boolean,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await switchboard.sendSbTxn(
      "setPermission",
      [granter, grantee, BigNumber.from(permission), enable],
      options
    );
    return tx;
  }

  public static async has(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number
  ): Promise<boolean> {
    const hasPermissions = await switchboard.sb.hasPermission(
      granter,
      grantee,
      BigNumber.from(permission)
    );
    return hasPermissions;
  }
}
