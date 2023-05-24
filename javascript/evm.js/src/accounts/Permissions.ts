import { ISwitchboardProgram, TransactionOptions } from "../types.js";

import { BigNumber, ContractTransaction } from "ethers";
import { OracleQueueAccount } from "./OracleQueueAccount.js";
import { AttestationQueueAccount } from "./AttestationQueueAccount.js";

export interface PermissionInitParams {
  grantee: string;
  granter: string;
  permission: number;
  enable?: boolean;
}

export class Permissions {
  private constructor() {}

  /**
   * Set permissions between a granter and grantee
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param granter The account granting permissions
   * @param grantee the account being granted permissions
   * @param permission the type of permissions to grant
   * @param enable whether to enable the permissions
   */
  public static async set(
    switchboard: ISwitchboardProgram,
    granter: OracleQueueAccount | AttestationQueueAccount,
    grantee: string,
    permission: number,
    enable?: boolean,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx =
      granter instanceof AttestationQueueAccount
        ? await Permissions.setAttestationPermissions(
            switchboard,
            granter.address,
            grantee,
            permission,
            enable,
            options
          )
        : await Permissions.setSwitchboardPermissions(
            switchboard,
            granter.address,
            grantee,
            permission,
            enable,
            options
          );
    return tx;
  }

  /**
   * Determines whether a given grantee and granter have a set of permissions
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param granter The account granting permissions
   * @param grantee the account being granted permissions
   * @param permission the type of permissions to grant
   * @param enable whether to enable the permissions
   */
  public static async has(
    switchboard: ISwitchboardProgram,
    granter: OracleQueueAccount | AttestationQueueAccount,
    grantee: string,
    permission: number
  ): Promise<boolean> {
    const tx =
      granter instanceof AttestationQueueAccount
        ? await Permissions.hasAttestationPermissions(
            switchboard,
            granter.address,
            grantee,
            permission
          )
        : await Permissions.hasSwitchboardPermissions(
            switchboard,
            granter.address,
            grantee,
            permission
          );
    return tx;
  }

  /**
   * Set permissions between a granter and grantee
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param granter The account granting permissions, typically the {@linkcode OracleQueueAccount}
   * @param grantee the account being granted permissions
   * @param permission the type of permissions to grant
   * @param enable whether to enable the permissions
   */
  public static async setSwitchboardPermissions(
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

  public static async hasSwitchboardPermissions(
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

  /**
   * Set permissions between a granter and grantee
   * @param switchboard the {@linkcode SwitchboardProgram} class
   * @param granter The account granting permissions, typically the {@linkcode AttestationQueueAccount}
   * @param grantee the account being granted permissions
   * @param permission the type of permissions to grant
   * @param enable whether to enable the permissions
   */
  public static async setAttestationPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number,
    enable?: boolean,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await switchboard.sendVsTxn(
      "setPermission",
      [granter, grantee, BigNumber.from(permission), enable],
      options
    );
    return tx;
  }

  public static async hasAttestationPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number
  ): Promise<boolean> {
    const hasPermissions = await switchboard.vs.hasPermission(
      granter,
      grantee,
      BigNumber.from(permission)
    );
    return hasPermissions;
  }
}
