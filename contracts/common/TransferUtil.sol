/*
 * SPDX-License-Identifier: Apache-2.0
 */
pragma solidity >=0.8;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library TransferUtil {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    function _in(address _token, address _spender, uint256 _amount) internal {
        if (_token == NATIVE_COIN_ADDRESS) {
            return;
        }
        IERC20Upgradeable(_token).safeTransferFrom(
            _spender,
            address(this),
            _amount
        );
    }

    function _out(
        address _token,
        address _recipient,
        uint256 _amount
    ) internal {
        if (_token == NATIVE_COIN_ADDRESS) {
            (bool sent, ) = payable(_recipient).call{value: _amount}("");
            _validate(sent, "Transfer native coin failed");
        }
        IERC20Upgradeable(_token).safeTransfer(_recipient, _amount);
    }

    function _isNativeCoin(address _token) internal {
        return _token == 0x0000000000000000000000000000000000000001;
    }
}
