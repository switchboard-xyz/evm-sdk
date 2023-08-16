//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ISwitchboard} from "./ISwitchboard.sol";

// EIP2771 Context
// Inherited by all contracts that are recipients of switchboard callbacks
contract Recipient {
  address immutable switchboard;

  constructor(address _switchboard) {
    switchboard = _switchboard;
  }

  function callSwitchboardFunction(
    address functionId,
    bytes memory params // arbitrary user-defined parameters handled function-side
  ) internal returns (address callId) {
    callId = ISwitchboard(switchboard).callFunction{value: msg.value}(
      functionId,
      params
    );
  }

  // get forwarded sender if trusted forwarder is used
  function getMsgSender() internal view returns (address payable signer) {
    signer = payable(msg.sender);
    if (msg.data.length >= 20 && signer == switchboard) {
      assembly {
        signer := shr(96, calldataload(sub(calldatasize(), 20)))
      }
    }
  }
}
