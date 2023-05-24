import {
  Authority,
  EnablePermissions,
  type ISwitchboardProgram,
} from "./types.js";

import { Signer } from "ethers";

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
  params: Authority
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
