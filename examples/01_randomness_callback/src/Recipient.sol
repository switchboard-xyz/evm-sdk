//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// EIP2771 Context
// Inherited by all contracts that are recipients of switchboard callbacks
contract Recipient {
  address immutable switchboard;

  constructor(address _switchboard) {
    switchboard = _switchboard;
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
