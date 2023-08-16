// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ISwitchboard.sol";

contract ReadAFeed {
    // version of this contract
    int256 public latestValue;
    uint256 public latestTimestamp;
    address switchboardPushAddress;
    address feedId;

    // constructor
    constructor(address _switchboard, address _feedId) {
        switchboardPushAddress = _switchboard;
        feedId = _feedId;
    }

    function latest() external view returns (int256, uint256) {
        return (latestValue, latestTimestamp);
    }

    function getLatestResult()
        external
        returns (int256 value, uint256 timestamp)
    {
        ISwitchboard switchboard = ISwitchboard(switchboardPushAddress);
        (
            int256 value,
            uint256 timestamp,
            uint256 _updatedAt,
            uint80 _intervalId
        ) = switchboard.getLatestResult(feedId);
        latestValue = value;
        latestTimestamp = timestamp;
    }
}
