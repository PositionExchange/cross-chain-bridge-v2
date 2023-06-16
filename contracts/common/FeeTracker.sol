/*
 * SPDX-License-Identifier: Apache-2.0
 */
pragma solidity >=0.8;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../interface/ICrossChainVerifier.sol";

abstract contract FeeTracker {
    using SafeMathUpgradeable for uint256;

    enum CollectFeeMethod {
        // Token does not required fee.
        NONE,
        // Token requires fee by default flat amount.
        FLAT,
        // Token requires fee by default percentage.
        PERCENTAGE,
        // Deduct token amount with RFI percentage then collect fee by default flat amount.
        RFI_N_FLAT,
        // Deduct token amount with RFI percentage then collect fee by default percentage.
        RFI_N_PERCENTAGE
    }

    function feePercentage(
        address _token
    ) public view virtual returns (uint256);

    function flatFeeAmount(
        address _token
    ) public view virtual returns (uint256);

    function tokenDecimals(
        address _token
    ) public view virtual returns (uint256);

    function tokenCollectFeeMethod(
        address _token
    ) public view virtual returns (CollectFeeMethod);

    function _collectFee(
        address _token,
        uint256 _amount
    ) internal returns (uint256, uint256) {
        CollectFeeMethod method = tokenCollectFeeMethod(_token);
        uint256 amountAfterFee = _amount;

        if (
            method == CollectFeeMethod.RFI_N_FLAT ||
            method == CollectFeeMethod.RFI_N_PERCENTAGE
        ) {
            amountAfterFee = _amountAfterRFI(amountAfterFee);
        }

        if (
            method == CollectFeeMethod.FLAT ||
            method == CollectFeeMethod.RFI_N_FLAT
        ) {
            amountAfterFee = _amountAfterFeeFlat(_token, amountAfterFee);
        }

        if (
            method == CollectFeeMethod.PERCENTAGE ||
            method == CollectFeeMethod.RFI_N_PERCENTAGE
        ) {
            amountAfterFee = _amountAfterFeePercent(_token, amountAfterFee);
        }

        uint256 fee = _amount.sub(amountAfterFee);
        _increaseFeeReserves(_token, fee);

        return (amountAfterFee, fee);
    }

    function _increaseFeeReserves(
        address _token,
        uint256 _amount
    ) internal virtual;

    function _amountAfterFeeFlat(
        address _token,
        uint256 _amount
    ) private view returns (uint256) {
        uint256 feeAmount = flatFeeAmount(_token);
        uint256 flatAmount = _adjustDecimalToToken(_token, feeAmount);
        return _amount.sub(flatAmount);
    }

    function _amountAfterFeePercent(
        address _token,
        uint256 _amount
    ) private view returns (uint256) {
        uint256 percent = feePercentage(_token);
        return _amount.mul(percent).div(1000);
    }

    function _amountAfterRFI(uint256 _amount) private pure returns (uint256) {
        return _amount.mul(99).div(100);
    }

    // Convert 10^18 ---> 10^decimals
    function _adjustDecimalToToken(
        address _token,
        uint256 _amount
    ) private view returns (uint256) {
        uint256 fromDecimal = 18;
        uint256 toDecimal = tokenDecimals(_token);
        return _amount.mul(10 ** fromDecimal).div(10 ** toDecimal);
    }
}
