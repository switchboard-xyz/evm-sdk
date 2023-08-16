//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Recipient} from "./Recipient.sol";

contract ReceiverExample is Recipient {
  uint256 public randomValue;
  address functionId;

  event NewRandomValue(uint256 value);

  constructor(
    address _switchboard, // Switchboard contract address
    address _functionId // Function id corresponding to the randomness function oracle
  ) Recipient(_switchboard) {
    functionId = _functionId;
  }

  function callback(uint256 value) external {
    // extract the sender from the callback, this validates that the switchboard contract called this function
    address msgSender = getMsgSender();

    // make sure the encoded caller is our function id
    if (msgSender != functionId) {
      revert("Invalid sender");
    }

    // set the random value
    randomValue = value;

    // emit an event
    emit NewRandomValue(value);
  }
}
