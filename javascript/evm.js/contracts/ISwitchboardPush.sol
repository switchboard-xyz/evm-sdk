// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Source can be found at https://github.com/switchboard-xyz/evm-functions-template/tree/main/rust/01_price_oracle/SwitchboardPushReceiver/contracts/src/SwitchboardPushReceiver
interface ISwitchboardPush {
    //=========================================================================
    // Events
    //=========================================================================

    // emitted when a new result lands for a feed
    event NewResult(
        bytes32 indexed feedId,
        uint80 indexed roundId,
        int256 value,
        uint256 timestamp
    );

    // emitted when a new adapter is deployed
    event NewAdapter(
        bytes32 indexed feedId,
        address indexed adapter,
        address indexed sender
    );

    // emitted when latestResult is called
    event ReadEvent(
        address indexed feedId,
        address indexed sender,
        int256 value,
        uint256 timestamp
    );

    //=========================================================================
    // Structs
    //=========================================================================

    struct Result {
        int256 value;
        uint256 startedAt;
        uint256 updatedAt;
    }

    struct Feed {
        address feedId;
        bytes32 feedName;
        uint80 latestIntervalId;
        Result latestResult; // used by default for getLatestResult
        bool historyEnabled; // by default off so we don't store all feed histories for all 500+ feeds forever
        bool latestResultFailed;
    }

    //=========================================================================
    // Functions
    //=========================================================================

    /**
     * deployFeedAdapter
     * Compatible with AggregatorV3 Interface
     * @param feedId feed id to deploy an adapter for
     * @param name name embedded in the AggregatorV3 adapter
     * @param description description embedded in the adapter
     * emits NewAdapter which can be used to get the adapter address
     *
     * Adapter source can be found at https://github.com/switchboard-xyz/evm-functions-template/blob/main/rust/01_price_oracle/SwitchboardPushReceiver/contracts/src/SwitchboardPushReceiver/Receiver/Aggregator.sol
     */
    function deployFeedAdapter(
        address feedId,
        string memory name,
        string memory description
    ) external;

    /**
     * getLatestResult
     * @param feedId feed id to get the latest result for
     * @return value latest value
     * @return timestamp timestamp of the latest value
     * @return updatedAt block.timestamp of the last update
     */
    function getLatestResult(
        address feedId
    )
        external
        returns (
            int256 value,
            uint256 timestamp,
            uint256 updatedAt,
            uint80 intervalId
        );

    //=========================================================================
    // Extra View Functions
    //=========================================================================

    function results(
        bytes32 feedName,
        uint80 intervalId
    ) external view returns (Result memory);

    function feeds(bytes32 feedName) external view returns (Feed memory);

    function getAllFeeds() external view returns (Feed[] memory);

    function latestTimestamp() external view returns (uint256);
}
