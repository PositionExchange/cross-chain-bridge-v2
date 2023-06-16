/*
 * SPDX-License-Identifier: Apache-2.0
 */
pragma solidity >=0.8;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../interface/ICrossChainVerifier.sol";
import "./TransferUtil.sol";

abstract contract FeeCollector {
    using SafeMathUpgradeable for uint256;

    address public feeTracker;
    uint256 public defaultFeePercentage;
    uint256 public defaultFeeFlatAmount;

    // Mapping of token address on this blockchain and it's corresponding decimals
    //
    // Map (token address on this blockchain => decimals)
    mapping(address => uint256) public tokenDecimals;

    // Mapping of token address on this blockchain and collect fee method
    //
    // Map (token address on this blockchain => minimum transfer amount)
    mapping(address => CollectFeeMethod) public tokenCollectFeeMethod;

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

    /**
     * Indicates an amount has been added to fee reserves on this blockchain.
     *
     * @param token              Token address from this blockchain.
     * @param amount             Fee amount collected, and transfer to FeeTracker contract.
     */
    event FeeReserveIncreased(address token, uint256 amount);

    function _collectFee(
        address _token,
        uint256 _amount
    ) internal returns (uint256, uint256) {
        CollectFeeMethod method = tokenCollectFeeMethod[_token];
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
            amountAfterFee = _amountAfterFeePercent(amountAfterFee);
        }

        uint256 fee = _amount.sub(amountAfterFee);
        _increaseFeeReserves(_token, fee);

        return (amountAfterFee, fee);
    }

    function _increaseFeeReserves(
        address _token,
        uint256 _amount
    ) private {
        TransferUtil._out(_token, feeTracker, fee);
        emit FeeReserveIncreased(_token, fee);
    }

    function _amountAfterFeeFlat(
        address _token,
        uint256 _amount
    ) private view returns (uint256) {
        uint256 flatAmount = _adjustDecimalToToken(
            _token,
            defaultFeeFlatAmount
        );
        return _amount.sub(flatAmount);
    }

    function _amountAfterFeePercent(
        uint256 _amount
    ) private view returns (uint256) {
        return _amount.mul(defaultFeePercentage).div(1000);
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
        uint256 toDecimal = tokenDecimals[_token];
        return _amount.mul(10 ** fromDecimal).div(10 ** toDecimal);
    }
}
