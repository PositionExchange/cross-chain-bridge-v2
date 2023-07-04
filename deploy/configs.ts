import {
  MultiChainSignerConfig,
  MultiChainToken,
  MultiChainTokenConfig,
  MultiCrossChainControlConfig,
} from "./types";
import {
  COLLECT_FEE_METHOD_PERCENTAGE,
  COLLECT_FEE_METHOD_RFI_N_PERCENTAGE,
  TOKEN_PROCESS_METHOD_MC,
  TOKEN_PROCESS_METHOD_MINTER,
} from "./constants";
import { parseEther } from "ethers/lib/utils";

export const POSI: MultiChainToken = {
  name: "POSI",
  symbol: "POSI",
  config: {
    97: {
      address: "0x09669dF289c10b89d03E14B84839c2d7776D509E",
      decimals: 18,
      minTransferAmount: parseEther("5"),
      feePercentage: 1, // 0.1%
      feeFlatAmount: parseEther("2"),
      processMethod: TOKEN_PROCESS_METHOD_MC,
      collectFeeMethod: COLLECT_FEE_METHOD_RFI_N_PERCENTAGE,
      maxFeeAmount: parseEther("2"),
    },
    421613: {
      address: "0xD55F32ac00Ef30Dec2fcE4D778468a88a45AC5bc",
      decimals: 8,
      minTransferAmount: parseEther("5"),
      feePercentage: 1, // 0.1%
      feeFlatAmount: parseEther("2"),
      processMethod: TOKEN_PROCESS_METHOD_MINTER,
      collectFeeMethod: COLLECT_FEE_METHOD_PERCENTAGE,
      maxFeeAmount: parseEther("2"),
    },
    910000: {
      address: "0x0000000000000000000000000000000000000001",
      decimals: 18,
      minTransferAmount: parseEther("5"),
      feePercentage: 1, // 0.1%
      feeFlatAmount: parseEther("2"),
      processMethod: TOKEN_PROCESS_METHOD_MC,
      collectFeeMethod: COLLECT_FEE_METHOD_PERCENTAGE,
      maxFeeAmount: parseEther("2"),
    },
    ////////////////////////////////
    //////// PRODUCTION ////////////
    ////////////////////////////////
    56: {
      address: "0x5CA42204cDaa70d5c773946e69dE942b85CA6706",
      decimals: 18,
      minTransferAmount: parseEther("5"),
      feePercentage: 1, // 0.1%
      feeFlatAmount: parseEther("2"),
      processMethod: TOKEN_PROCESS_METHOD_MC,
      collectFeeMethod: COLLECT_FEE_METHOD_RFI_N_PERCENTAGE,
      maxFeeAmount: parseEther("2"),
    },
    42161: {
      address: "0x97fdA4b9Fbe0efe839EfD2B104E494e3C95CCc44",
      decimals: 18,
      minTransferAmount: parseEther("5"),
      feePercentage: 1, // 0.1%
      feeFlatAmount: parseEther("2"),
      processMethod: TOKEN_PROCESS_METHOD_MC,
      collectFeeMethod: COLLECT_FEE_METHOD_PERCENTAGE,
      maxFeeAmount: parseEther("2"),
    },
    900000: {
      address: "0x0000000000000000000000000000000000000001", // Native token
      decimals: 18,
      minTransferAmount: parseEther("5"),
      feePercentage: 1, // 0.1%
      feeFlatAmount: parseEther("2"),
      processMethod: TOKEN_PROCESS_METHOD_MC,
      collectFeeMethod: COLLECT_FEE_METHOD_PERCENTAGE,
      maxFeeAmount: parseEther("2"),
    },
  },
};

export const BridgeConfigs: {
  [chainId: number]: MultiChainTokenConfig;
} = {
  97: {
    supportChains: [
      {
        chainId: 421613,
        supportTokens: [POSI],
        remoteBridge: "0xf60529ce24A785F532f2E00015CF174Ce1e1E98A",
      },
      {
        chainId: 910000,
        supportTokens: [POSI],
        remoteBridge: "0xBA31a987e3eD0A8170CB14D164ecE5D75fb9D563",
      },
    ],
  },
  421613: {
    supportChains: [
      {
        chainId: 97,
        supportTokens: [POSI],
        remoteBridge: "0xe6ECcE0295ED15f4f3D181111fE58b30eF5553C6",
      },
      {
        chainId: 910000,
        supportTokens: [POSI],
        remoteBridge: "0xBA31a987e3eD0A8170CB14D164ecE5D75fb9D563",
      },
    ],
  },
  910000: {
    supportChains: [
      {
        chainId: 97,
        supportTokens: [POSI],
        remoteBridge: "0xe6ECcE0295ED15f4f3D181111fE58b30eF5553C6",
      },
      {
        chainId: 421613,
        supportTokens: [POSI],
        remoteBridge: "0xf60529ce24A785F532f2E00015CF174Ce1e1E98A",
      },
    ],
  },
};

export const CBCConfigs: {
  [chainId: number]: MultiCrossChainControlConfig;
} = {
  97: {
    supportChains: [
      {
        chainId: 421613,
        destCrossChainControl: "0x9Dc19290B7d4F9333A2bE7f8A34A5Ea9D70AaDE8",
        verifier: "0x49A86c2A5C481940bd3Db0bC9a09831eEc4D3AFC",
      },
      {
        chainId: 910000,
        destCrossChainControl: "0x91b60d839d75A7595838F9eAa78BCb07AcC9C09e",
        verifier: "0x49A86c2A5C481940bd3Db0bC9a09831eEc4D3AFC",
      },
    ],
  },
  421613: {
    supportChains: [
      {
        chainId: 97,
        destCrossChainControl: "0xA4d8982ebDaba7fE1d09b06985FD623928A97d3F",
        verifier: "0xD5814BDe813266e56cd0680513B4f4029F57DD3b",
      },
      {
        chainId: 910000,
        destCrossChainControl: "0x91b60d839d75A7595838F9eAa78BCb07AcC9C09e",
        verifier: "0xD5814BDe813266e56cd0680513B4f4029F57DD3b",
      },
    ],
  },
  910000: {
    supportChains: [
      {
        chainId: 97,
        destCrossChainControl: "0xA4d8982ebDaba7fE1d09b06985FD623928A97d3F",
        verifier: "0xf042A1810EB328D49d4ae020933bE722B767a54f",
      },
      {
        chainId: 421613,
        destCrossChainControl: "0x9Dc19290B7d4F9333A2bE7f8A34A5Ea9D70AaDE8",
        verifier: "0xf042A1810EB328D49d4ae020933bE722B767a54f",
      },
    ],
  },
};

export const SignerConfigs: {
  [chainId: number]: MultiChainSignerConfig;
} = {
  97: {
    supportChains: [
      { chainId: 421613, signer: "0xd7c663fDEFE53860DCA90144Fe8f6Dccb37c57Bb" },
      { chainId: 910000, signer: "0xd7c663fDEFE53860DCA90144Fe8f6Dccb37c57Bb" },
    ],
  },
  421613: {
    supportChains: [
      { chainId: 97, signer: "0xd7c663fDEFE53860DCA90144Fe8f6Dccb37c57Bb" },
      { chainId: 910000, signer: "0xd7c663fDEFE53860DCA90144Fe8f6Dccb37c57Bb" },
    ],
  },
  910000: {
    supportChains: [
      { chainId: 97, signer: "0xd7c663fDEFE53860DCA90144Fe8f6Dccb37c57Bb" },
      { chainId: 421613, signer: "0xd7c663fDEFE53860DCA90144Fe8f6Dccb37c57Bb" },
    ],
  },
};
