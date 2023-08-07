import type {
  Authority,
  EnablePermissions,
  PermissionStatusType,
  VerificationStatusType,
} from "./types.js";
import {
  type ISwitchboardProgram,
  PermissionStatus,
  VerificationStatus,
} from "./types.js";

import type { Big } from "@switchboard-xyz/common";
import { BN, SwitchboardDecimal } from "@switchboard-xyz/common";
import { BigNumber, Signer } from "ethers";

export const getQueueSigner = (
  enable: EnablePermissions
): Signer | undefined => {
  return typeof enable !== "boolean" &&
    "queueAuthority" in enable &&
    Signer.isSigner(enable.queueAuthority)
    ? enable.queueAuthority
    : undefined;
};

export const getAuthoritySigner = async (
  switchboard: ISwitchboardProgram,
  params?: Authority
): Promise<[ISwitchboardProgram, string, Signer | undefined]> => {
  const isAuthoritySigner =
    params &&
    "authority" in params &&
    typeof params.authority !== "string" &&
    Signer.isSigner(params.authority);

  let authority: string | undefined = undefined;
  if (params && "authority" in params) {
    if (typeof params.authority === "string") {
      authority = params.authority;
    } else if (Signer.isSigner(params.authority)) {
      authority = await (params.authority as Signer).getAddress();
    }
  }

  if (!authority) {
    try {
      authority = await switchboard.address;
    } catch {}
  }

  if (!authority) {
    throw new Error(
      `You need to provide an 'authority' as a string or a signer to create an account`
    );
  }

  return [
    isAuthoritySigner
      ? switchboard.connect(params.authority as Signer)
      : switchboard,
    authority,
    isAuthoritySigner ? (params.authority as Signer) : undefined,
  ];
};

export function toBigNumber(big: Big): BigNumber {
  const sbDecimal = SwitchboardDecimal.fromBig(big);

  let mantissa = sbDecimal.mantissa.toString();
  let scale = sbDecimal.scale;
  while (scale < 18) {
    mantissa += "0";
    scale++;
  }

  return BigNumber.from(mantissa);
}

export function fromBigNumber(bigNum: BigNumber): Big {
  return new SwitchboardDecimal(new BN(bigNum.toString()), 18).toBig();
}

export const getPermissionString = (
  _permissions: number | BigNumber
): PermissionStatusType => {
  const permissions =
    typeof _permissions === "number" ? _permissions : _permissions.toNumber();

  const permissionString = (
    Object.keys(PermissionStatus) as PermissionStatusType[]
  ).find(
    (key: PermissionStatusType) =>
      PermissionStatus[key as PermissionStatusType] === permissions
  ) as PermissionStatusType | undefined;

  if (!permissionString) {
    return "NONE";
  }

  return permissionString;
};

export const getVerificationStatusString = (
  _verificationStatus: number | BigNumber
): VerificationStatusType | "NONE" => {
  const verificationStatus =
    typeof _verificationStatus === "number"
      ? _verificationStatus
      : _verificationStatus.toNumber();
  const verificationStatusString = (
    Object.keys(VerificationStatus) as VerificationStatusType[]
  ).find(
    (key: VerificationStatusType) =>
      PermissionStatus[key as VerificationStatusType] === verificationStatus
  ) as VerificationStatusType | undefined;
  if (!verificationStatusString) {
    return "NONE";
  }
  return verificationStatusString;
};
