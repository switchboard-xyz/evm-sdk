import { SwitchboardProgram } from "../SwitchboardProgram.js";

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
    switchboard: SwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number,
    enable?: boolean
  ): Promise<ContractTransaction> {
    const tx = await switchboard.sb.setPermission(
      grantee,
      granter,
      BigNumber.from(permission),
      enable ?? false
    );
    return tx;
  }

  public static async has(
    switchboard: SwitchboardProgram,
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
