/*
 * SPDX-License-Identifier: Apache-2.0
 */
pragma solidity ^0.8.8;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

contract FeeTracker is OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    address public constant NATIVE_COIN_ADDRESS =
        0x0000000000000000000000000000000000000001;

    /**
     * Initialize the contract.
     *
     */
    function initialize() public initializer {
        __Ownable_init();
    }

    function withdrawFee(
        address _token,
        address _recipient
    ) external onlyOwner {
        if (_token == NATIVE_COIN_ADDRESS) {
            (bool sent, ) = payable(_recipient).call{value: address(this).balance}("");
            require(sent, "Transfer native coin failed");
            return;
        }

        IERC20Upgradeable token = IERC20Upgradeable(_token);
        uint256 balance = token.balanceOf(address(this));
        token.safeTransfer(_recipient, balance);
    }
}
