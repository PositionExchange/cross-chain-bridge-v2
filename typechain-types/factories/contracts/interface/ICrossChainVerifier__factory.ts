/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ICrossChainVerifier,
  ICrossChainVerifierInterface,
} from "../../../contracts/interface/ICrossChainVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockchainId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_eventSig",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signedEventInfo",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "decodeAndVerifyEvent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockchainId",
        type: "uint256",
      },
    ],
    name: "getSignerList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockchainId",
        type: "uint256",
      },
    ],
    name: "supportedSigningAlgorithm",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ICrossChainVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): ICrossChainVerifierInterface {
    return new Interface(_abi) as ICrossChainVerifierInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ICrossChainVerifier {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ICrossChainVerifier;
  }
}
