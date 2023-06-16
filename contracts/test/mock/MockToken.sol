/*
 * SPDX-License-Identifier: Apache-2.0
 */
pragma solidity ^0.8.8;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract MockToken is ERC20BurnableUpgradeable {
    uint8 private _decimal;

    bool public isRFI;
    address public minter;

    function initialize(
        string memory name_,
        string memory symbol_,
        uint8 decimal_,
        bool isRFI_,
        address minter_
    ) public initializer {
        __ERC20_init(name_, symbol_);
        __ERC20Burnable_init();

        _decimal = decimal_;
        isRFI = isRFI_;
        minter = minter_;
    }

    function mint(address account, uint256 amount) external {
        if (minter != address(0)) {
            require(minter == msg.sender, "only minter");
        }
        _mint(account, amount);
    }

    function decimals() public view override returns (uint8) {
        return _decimal;
    }

    function updateMinter(address _address) external {
        minter = _address;
    }
}
