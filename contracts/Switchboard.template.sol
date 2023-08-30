// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ISwitchboard} from "./ISwitchboard.sol";
import {ISwitchboardPush} from "./ISwitchboardPush.sol";
import {Aggregator} from "./Aggregator.sol";

/**
 * @title <<Chain>> <<Network>> switchboard library
 * @dev Switchboard Operations
 */
library Switchboard {
    // PER-NETWORK IDs/ ADDRESSES
    address constant SWITCHBOARD_ADDRESS =
        0x0000000000000000000000000000000000000001;
    address constant SWITCHBOARD_PUSH_ADDRESS =
        0x0000000000000000000000000000000000000001;
    address constant ATTESTATION_QUEUE_ID =
        0x0000000000000000000000000000000000000001;

    error InvalidSender(address expected, address received);

    /**
     * Function config - to minimize impact on stack depth
     * @param name name exposed to the Switchboard Explorer
     * @param authority the function's authority
     * @param containerRegistry "dockerhub"
     * @param container container name, ex: "switchboardlabs/function-example"
     * @param version container version tag, ex: "latest"
     * @param schedule cron schedule, ex: "0 * * * *"
     * @param paramsSchema json schema for the function's params
     * @param permittedCallers array of addresses that are allowed to call the function (empty array for all)
     */
    struct FunctionConfig {
        string name;
        address authority;
        address queueId;
        string containerRegistry;
        string container;
        string version;
        string schedule;
        string paramsSchema;
        address[] permittedCallers;
    }

    /**
     * Function Call Settings (all optional)
     * @param requireEstimatedRunCostFee require that the payment be at least the estimated run cost
     * (uses recent runs for gas cost estimation, so first is the least expensive)
     * @param minimumFee minimum fee that a function caller must pay
     * @param maxGasCost maximum gas cost that a function run can cost
     * @param requireCallerPayFullCost require that the caller pay the full cost of the call
     * @param requireSenderBeReturnAddress require that the callback target be the caller contract
     */
    struct FunctionCallConfig {
        bool requireEstimatedRunCostFee;
        uint256 minimumFee;
        uint256 maxGasCost;
        bool requireCallerPayFullCost;
        bool requireSenderBeReturnAddress;
    }

    /**
     * Read a feed's latest result
     * @param feedId the feed's id
     * @return value the feed's latest value
     * @return timestamp the feed's latest timestamp
     * @dev reverts if the feed does not exist or the feed has no results
     */
    function getLatestResult(
        address feedId
    ) internal returns (int256 value, uint256 timestamp) {
        (value, timestamp, , ) = ISwitchboardPush(SWITCHBOARD_PUSH_ADDRESS)
            .getLatestResult(feedId);
    }

    /**
     * Get a feed by name
     * @param pairName the feed's name encoded as bytes32, ex: BTC/USDT
     */
    function getFeed(
        bytes32 pairName // feed name encoded as bytes32
    ) internal view returns (ISwitchboardPush.Feed memory feed) {
        feed = ISwitchboardPush(SWITCHBOARD_PUSH_ADDRESS).feeds(pairName);
    }

    /**
     * Call a function with params - and pay into the function's escrow (if applicable)
     * @param functionId the function's id to be called
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @return callId the call's id
     * @dev reverts if the function does not exist
     * @dev reverts if the caller's address is not allowed to call the function
     * @dev reverts if the function isn't called with enough funding
     * @dev emits ISwitchboard.FunctionCallEvent
     * @dev emits ISwitchboard.FunctionCallFund if the function call is funded
     */
    function callFunction(
        address functionId,
        bytes memory params, // arbitrary user-defined parameters handled function-side
        uint256 value
    ) internal returns (address callId) {
        callId = ISwitchboard(SWITCHBOARD_ADDRESS).callFunction{value: value}(
            functionId,
            params
        );
    }

    /**
     * Get estimated run cost for a function (based on last run + gas price)
     * - this is just supposed to predict gas cost of running a function
     * @param functionId the function's id
     * @param gasPrice the gas price to use for the estimate
     */
    function estimatedRunCost(
        address functionId,
        uint256 gasPrice
    ) external view returns (uint256) {
        return
            ISwitchboard(SWITCHBOARD_ADDRESS).estimatedRunCost(
                functionId,
                gasPrice
            );
    }

    /**
     * Create a function
     * @param functionId the function's id
     * @param params function parameters
     * @dev emits FunctionAccountInit event
     */
    function createFunction(
        address functionId,
        FunctionConfig memory params,
        uint256 initialFunding
    ) external {
        ISwitchboard(SWITCHBOARD_ADDRESS).createFunctionWithId{
            value: initialFunding
        }(
            functionId,
            params.name,
            params.authority,
            ATTESTATION_QUEUE_ID,
            params.containerRegistry,
            params.container,
            params.version,
            params.schedule,
            params.paramsSchema,
            params.permittedCallers
        );
    }

    /**
     * Set parameters around calling functions - each of these defaults to 0 / false / empty
     * @param functionId the function's id
     * @param params function parameters
     * @dev reverts if the caller is not the function's authority
     */
    function setFunctionConfig(
        address functionId,
        FunctionConfig memory params
    ) external {
        ISwitchboard(SWITCHBOARD_ADDRESS).setFunctionConfig(
            functionId,
            params.name,
            params.authority,
            params.containerRegistry,
            params.container,
            params.version,
            params.schedule,
            params.paramsSchema,
            params.permittedCallers
        );
    }

    /**
     * Set parameters around calling functions - each of these defaults to 0 / false / empty - entirely optional
     * @param params function parameters
     * @dev reverts if the caller is not the function's authority
     */
    function setFunctionCallSettings(
        address functionId,
        FunctionCallConfig memory params
    ) external {
        ISwitchboard(SWITCHBOARD_ADDRESS).setFunctionCallSettings(
            functionId,
            params.requireEstimatedRunCostFee,
            params.minimumFee,
            params.maxGasCost,
            params.requireCallerPayFullCost,
            params.requireSenderBeReturnAddress
        );
    }

    /**
     * Deploy an adapter contract compatible with AggregatorV3 Interface
     * @notice the adapter will just call functions already available in the SwitchboardPushReceiver contract, this is just for backwards compatibility
     *
     * @param feedId feed id to deploy an adapter for
     * @param name name embedded in the AggregatorV3 adapter
     * @param description description embedded in the adapter
     * emits ISwitchboardPush.NewAdapter event which can be used to get the adapter address once deployed
     *
     * Adapter source can be found at https://github.com/switchboard-xyz/evm-functions-template/blob/main/rust/01_price_oracle/SwitchboardPushReceiver/contracts/src/SwitchboardPushReceiver/Receiver/Aggregator.sol
     */
    function deployAggregator(
        address feedId,
        string memory name,
        string memory description
    ) external {
        ISwitchboardPush(SWITCHBOARD_PUSH_ADDRESS).deployFeedAdapter(
            feedId,
            name,
            description
        );
    }

    /**
     * Deploy an adapter contract compatible with AggregatorV3 Interface
     * @notice the adapter will just call functions already available in the SwitchboardPushReceiver contract, this is just for backwards compatibility
     *
     * @param feedName feed name to deploy an adapter for --- this value is a bytes32 encoded pair name (ex: BTC/USDT)
     * @param name name embedded in the AggregatorV3 adapter
     * @param description description embedded in the adapter
     * emits ISwitchboardPush.NewAdapter event which can be used to get the adapter address once deployed
     *
     * Adapter source can be found at https://github.com/switchboard-xyz/evm-functions-template/blob/main/rust/01_price_oracle/SwitchboardPushReceiver/contracts/src/SwitchboardPushReceiver/Receiver/Aggregator.sol
     */
    function createAggregator(
        bytes32 feedName,
        string memory name,
        string memory description
    ) external returns (Aggregator newAggregator) {
        ISwitchboardPush.Feed memory feed = getFeed(feedName);
        newAggregator = new Aggregator(
            SWITCHBOARD_PUSH_ADDRESS,
            feed.feedId,
            bytes32(feedName),
            name,
            description
        );
    }

    /**
     * Get the encoded sender in the current call (if called from Switchboard)
     */
    function getEncodedFunctionId()
        internal
        view
        returns (address payable signer)
    {
        signer = payable(msg.sender);
        if (signer != SWITCHBOARD_ADDRESS) {
            revert InvalidSender(SWITCHBOARD_ADDRESS, signer);
        }

        if (msg.data.length >= 20) {
            assembly {
                signer := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        }
    }
}
