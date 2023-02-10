// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISwitchboard {

  // read from aggregator
  function latestResult(address aggregatorAddress) 
    external 
    payable 
    returns (
      int256 value, 
      uint timestamp
    );

  // read round from an aggregator
  function latestRound(address aggregatorAddress) 
    external 
    payable 
    returns (
      uint80 round,
      int256 value, 
      uint256 timestamp,
      uint256 oldestConsideredValueTimestamp
    );
}