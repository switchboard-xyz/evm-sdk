//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title SwitchboardCallbackHandler
/// @author Switchboard
/// @notice This contract provides modifiers which can optionally be overridden to allow Switchboard Function consumers to validate whether a instruction was invoked from the Switchboard program and corresponds to an expected functionId.
abstract contract SwitchboardCallbackHandler {
    /// @notice This error is thrown when a callback is invoked without a functionId in the first 20 bytes of msg.data.
    /// @dev Selector: 0xd7cc7ef2
    error SwitchboardCallbackHandler__MissingFunctionId();

    /// @notice This error is thrown when a callback is invoked from an address other than the Switchboard contract address returned from getSwithboardAddress.
    /// @dev Selector: 0xd3bc3e7e
    error SwitchboardCallbackHandler__InvalidSender(
        address expected,
        address received
    );

    /// @notice This error is thrown when a callback is invoked with a functionId other than the Switchboard functionId returned from getSwitchboardFunctionId.
    /// @dev Selector: 0x324ac221
    error SwitchboardCallbackHandler__InvalidFunction(
        address expected,
        address received
    );

    /// @notice Retrieves the address of the Switchboard.
    /// @return The address of the Switchboard.
    function getSwithboardAddress() internal view virtual returns (address);

    /// @notice Retrieves the expected functionId.
    /// @return The address corresponding to the functionId.
    function getSwitchboardFunctionId() internal view virtual returns (address);

    /// @notice Modifier that ensures the caller is the expected Switchboard address.
    /// @dev This modifier ensures your callback will only be invoked by the Switchboard contract and should always be added to callback methods.
    modifier isSwitchboardCaller() virtual {
        address expectedSbAddress = getSwithboardAddress();
        address payable receivedCaller = payable(msg.sender);
        if (receivedCaller != expectedSbAddress) {
            revert SwitchboardCallbackHandler__InvalidSender(
                expectedSbAddress,
                receivedCaller
            );
        }
        _;
    }

    /// @notice Modifier that ensures the functionId in the call data matches the expected functionId.
    /// @dev This modifier ensures the Switchboard contract is invoking the correct callback method for your contract.
    modifier isFunctionId() virtual {
        address expectedFunctionId = getSwitchboardFunctionId();

        if (msg.data.length < 20) {
            revert SwitchboardCallbackHandler__MissingFunctionId();
        }

        address receivedFunctionId;
        assembly {
            receivedFunctionId := shr(96, calldataload(sub(calldatasize(), 20)))
        }

        if (receivedFunctionId != expectedFunctionId) {
            revert SwitchboardCallbackHandler__InvalidFunction(
                expectedFunctionId,
                receivedFunctionId
            );
        }
        _;
    }
}
