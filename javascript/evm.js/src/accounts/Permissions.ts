import { EthersError } from "../errors.js";
import type {
  ISwitchboardProgram,
  PermissionStatusType,
  TransactionOptions,
} from "../types.js";
import { getPermissionString } from "../utils.js";

import { AttestationQueueAccount } from "./AttestationQueueAccount.js";
import type { OracleQueueAccount } from "./OracleQueueAccount.js";

import type { ContractTransaction } from "ethers";
import { BigNumber } from "ethers";

/**
 * @interface PermissionInitParams
 * @description Interface for the Permission initialization parameters
 */
export interface PermissionInitParams {
  grantee: string;
  granter: string;
  permission: number;
  enable?: boolean;
}

/**
 * @class Permissions
 * @description Class for interacting with Permissions in the {@link Switchboard} and {@link SwitchboardAttestationService} contracts.
 */
export class Permissions {
  private constructor() {}

  /**
   * @async
   * @function get
   * @description Static method to set permissions between a granter and a grantee
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   *
   * @returns {Promise<PermissionStatusType>} Promise that resolves to the ContractTransaction
   *
   *
   * const contractTransaction = await Permissions.set(switchboard, granter, grantee, permission, enable, options);
   */
  public static async get(
    switchboard: ISwitchboardProgram,
    granter: OracleQueueAccount | AttestationQueueAccount,
    grantee: string
  ): Promise<PermissionStatusType> {
    const permissions =
      granter instanceof AttestationQueueAccount
        ? await Permissions.getAttestationPermissions(
            switchboard,
            granter.address,
            grantee
          )
        : await Permissions.getSwitchboardPermissions(
            switchboard,
            granter.address,
            grantee
          );
    return permissions;
  }

  /**
   * @async
   * @function set
   * @description Static method to set permissions between a granter and a grantee
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   * @param permission - The type of permissions to grant
   * @param [enable] - Whether to enable the permissions
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to the ContractTransaction
   *
   *
   * const contractTransaction = await Permissions.set(switchboard, granter, grantee, permission, enable, options);
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
   * @async
   * @function has
   * @description Static method to determine whether a given grantee and granter have a set of permissions
   *
   * @param switchboard - Instance of the {@link SwitchboardProgram} class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   * @param permission - The type of permissions to check
   *
   * @returns {Promise<boolean>} Promise that resolves to a boolean indicating whether the grantee and granter have the set of permissions
   *
   *
   * const hasPermissions = await Permissions.has(switchboard, granter, grantee, permission);
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
   * @async
   * @function getSwitchboardPermissions
   * @description Static method to fetch permissions between a granter and a grantee
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   *
   * @returns {Promise<PermissionStatusType>} Promise that resolves to the permission string
   *
   *
   * const contractTransaction = await Permissions.setSwitchboardPermissions(switchboard, granter, grantee, permission, enable, options);
   */
  public static async getSwitchboardPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string
  ): Promise<PermissionStatusType> {
    const permissions = await switchboard.sb.getPermission(granter, grantee);
    return getPermissionString(permissions);
  }

  /**
   * @async
   * @function setSwitchboardPermissions
   * @description Static method to set permissions between a granter and a grantee
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   * @param permission - The type of permissions to grant
   * @param [enable] - Whether to enable the permissions
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to the ContractTransaction
   *
   *
   * const contractTransaction = await Permissions.setSwitchboardPermissions(switchboard, granter, grantee, permission, enable, options);
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
      "setOracleQueuePermission", // single permission store accross the app
      [granter, grantee, BigNumber.from(permission), enable],
      options
    );
    return tx;
  }

  /**
   * @async
   * @function hasSwitchboardPermissions
   * @description Static method to determine whether a given grantee and granter have a set of permissions in Switchboard
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   * @param permission - The type of permissions to check
   *
   * @returns {Promise<boolean>} Promise that resolves to a boolean indicating whether the grantee and granter have the set of permissions in Switchboard
   *
   *
   * const hasPermissions = await Permissions.hasSwitchboardPermissions(switchboard, granter, grantee, permission);
   */
  public static async hasSwitchboardPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number
  ): Promise<boolean> {
    const hasPermissions = await switchboard.sb
      .hasPermission(granter, grantee, BigNumber.from(permission))
      .catch(EthersError.handleError);
    return hasPermissions;
  }

  /**
   * @async
   * @function getAttestationPermissions
   * @description Static method to fetch permissions between a granter and a grantee
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   *
   * @returns {Promise<PermissionStatusType>} Promise that resolves to the permission string
   *
   *
   * const contractTransaction = await Permissions.setSwitchboardPermissions(switchboard, granter, grantee, permission, enable, options);
   */
  public static async getAttestationPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string
  ): Promise<PermissionStatusType> {
    const permissions = await switchboard.sb.getPermission(granter, grantee);
    return getPermissionString(permissions);
  }

  /**
   * @async
   * @function setAttestationPermissions
   * @description Static method to set permissions between a granter and a grantee in Attestation
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   * @param permission - The type of permissions to grant
   * @param [enable] - Whether to enable the permissions
   * @param [options] - Transaction options
   *
   * @returns {Promise<ContractTransaction>} Promise that resolves to the ContractTransaction
   *
   *
   * const contractTransaction = await Permissions.setAttestationPermissions(switchboard, granter, grantee, permission, enable, options);
   */
  public static async setAttestationPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number,
    enable?: boolean,
    options?: TransactionOptions
  ): Promise<ContractTransaction> {
    const tx = await switchboard.sendSbTxn(
      "setAttestationQueuePermission",
      [granter, grantee, BigNumber.from(permission), enable],
      options
    );
    return tx;
  }

  /**
   * @async
   * @function hasAttestationPermissions
   * @description Static method to determine whether a given grantee and granter have a set of permissions in Attestation
   *
   * @param switchboard - Instance of the Switchboard Program class
   * @param granter - The account granting permissions
   * @param grantee - The account being granted permissions
   * @param permission - The type of permissions to check
   *
   * @returns {Promise<boolean>} Promise that resolves to a boolean indicating whether the grantee and granter have the set of permissions in Attestation
   *
   *
   * const hasPermissions = await Permissions.hasAttestationPermissions(switchboard, granter, grantee, permission);
   */
  public static async hasAttestationPermissions(
    switchboard: ISwitchboardProgram,
    granter: string,
    grantee: string,
    permission: number
  ): Promise<boolean> {
    const hasPermissions = await switchboard.sb
      .hasPermission(granter, grantee, BigNumber.from(permission))
      .catch(EthersError.handleError);
    return hasPermissions;
  }
}
