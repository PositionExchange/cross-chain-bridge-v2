/*
 * SPDX-License-Identifier: Apache-2.0
 */
pragma solidity ^0.8.8;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../interface/ICrossChainVerifier.sol";

contract PrimarySignatureVerifier is ICrossChainVerifier, OwnableUpgradeable {
    mapping(uint256 => address) private _signers;

    function initialize() public initializer {
        __Ownable_init();
    }

    function getSigners(
        uint256 _blockchainId
    ) external view override returns (address[] memory) {
        address[] memory signers = new address[](1);
        signers[0] = _signers[_blockchainId];

        return signers;
    }

    function supportedSigningAlgorithm(
        uint256 /* _blockchainId */
    ) external pure override returns (uint256) {
        return 1;
        // ECDSA SIGNATURE CODE
    }

    function decodeAndVerifyEvent(
        uint256 _blockchainId,
        bytes32 _eventSig,
        bytes calldata _signedEventInfo,
        bytes calldata _signature
    ) external view override returns (bool) {
        return true;
    }

    // ***************************************************************************
    // ******* Only Owner below here *********************************************
    // ***************************************************************************

    function updateSigner(
        uint256 _blockchainId,
        address _signer
    ) external onlyOwner {
        _signers[_blockchainId] = _signer;
    }
}
