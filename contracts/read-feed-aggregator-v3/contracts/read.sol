// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ILegacyOracle.sol"; // AggregatorV3Interface

contract ReadAFeed {
  
  // version of this contract
  int256 public latestValue;
  uint256 public latestTimestamp;
  address switchboardAddress;
  address aggregatorAddress;

  // constructor
  constructor(address _switchboard, address _aggregatorAdapterAddress) {
    switchboardAddress = _switchboard;
    aggregatorAddress = _aggregatorAdapterAddress;
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

      AggregatorV3Interface aggregator = AggregatorV3Interface(switchboardAddress);

      // fetch the latest round
      (
      /*uint80 roundId*/,
      int256 answer,
      uint256 startedAt,
      /*uint256 updatedAt*/,
      /*uint80 answeredInRound*/
      ) = aggregator.latestRoundData();

      // set these loocally
      latestTimestamp = startedAt;
      latestValue = answer;

      // return these
      value = answer;
      timestamp = startedAt;
    }
}