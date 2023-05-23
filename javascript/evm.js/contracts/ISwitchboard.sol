// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISwitchboard {

  // read the latest result (value and timestamp)
  function latestResult(address aggregatorAddress) 
    external 
    payable 
    returns (
      int256 value, 
      uint timestamp
    );

  // adapter fns
  function getIntervalResult(address aggregatorAddress, uint80 round) 
    external 
    view 
    returns (
      int256 value,
      uint256 timestamp,
      uint256 medianTimestamp
    );
    
  function getCurrentIntervalId(address aggregatorAddress) 
    external 
    view 
    returns (uint80);
}