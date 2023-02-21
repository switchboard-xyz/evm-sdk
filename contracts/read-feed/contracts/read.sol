// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ISwitchboard.sol";

contract ReadAFeed {
  
  // version of this contract
  int256 public latestValue;
  uint256 public latestTimestamp;
  address switchboardAddress;
  address aggregatorAddress;

  // constructor
  constructor(address _switchboard, address _aggregatorAddress) {
    switchboardAddress = _switchboard;
    aggregatorAddress = _aggregatorAddress;
  }

  function latest() external view returns (int256, uint256) {
    return (latestValue, latestTimestamp);
  }

  function getLatestResult()
    external
    returns (
      int256 value,
      uint256 timestamp
    ) {
      
      ISwitchboard switchboard = ISwitchboard(switchboardAddress);
      (value, timestamp) = switchboard.latestResult(aggregatorAddress);
      latestValue = value;
      latestTimestamp = timestamp;
    }
}