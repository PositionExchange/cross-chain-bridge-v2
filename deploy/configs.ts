import {
  MultiChainSignerConfig,
  MultiChainToken,
  MultiChainTokenConfig,
  MultiCrossChainControlConfig,
} from "./types";
import { BigNumber } from "ethers";

export const POSI: MultiChainToken = {
  name: "POSI",
  symbol: "POSI",
  config: {
    97: {
      address: "0x09669dF289c10b89d03E14B84839c2d7776D509E",
      decimals: 18,
      minTransferAmount: BigNumber.from("5000000000000000000"),
      feePercentage: 990, // 1%
      feeFlatAmount: BigNumber.from("2000000000000000000"), // In Wei
      processMethod: 2,
      collectFeeMethod: 4,
    },
    421613: {
      address: "0xDFBfDb23B598F0F4335A98c19B5A8335ca882Ea2",
      decimals: 8,
      minTransferAmount: BigNumber.from("500000000"),
      feePercentage: 990, // 1%
      feeFlatAmount: BigNumber.from("2000000000000000000"), // In Wei
      processMethod: 1,
      collectFeeMethod: 2,
    },
    910000: {
      address: "0x0000000000000000000000000000000000000001",
      decimals: 18,
      minTransferAmount: BigNumber.from("5000000000000000000"),
      feePercentage: 990, // 1%
      feeFlatAmount: BigNumber.from("2000000000000000000"), // In Wei
      processMethod: 2,
      collectFeeMethod: 2,
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
        remoteBridge: "0x126e25C57eC2567368Cc1405f2662622E1e58E29",
      },
      {
        chainId: 910000,
        supportTokens: [POSI],
        remoteBridge: "0x3632Ae704CC6325f8545c92BD8e09Af952943677",
      },
    ],
  },
  421613: {
    supportChains: [
      {
        chainId: 97,
        supportTokens: [POSI],
        remoteBridge: "0xB288923F130C64fDcE646c7d37a342f164A2DCc8",
      },
      {
        chainId: 910000,
        supportTokens: [POSI],
        remoteBridge: "0x3632Ae704CC6325f8545c92BD8e09Af952943677",
      },
    ],
  },
  910000: {
    supportChains: [
      {
        chainId: 97,
        supportTokens: [POSI],
        remoteBridge: "0xB288923F130C64fDcE646c7d37a342f164A2DCc8",
      },
      {
        chainId: 421613,
        supportTokens: [POSI],
        remoteBridge: "0x126e25C57eC2567368Cc1405f2662622E1e58E29",
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
        destCrossChainControl: "0xe7011A188A8453CDF846d2C9d5D8eaF3297DBBA2",
        verifier: "0xa5Beb85D35504F4699EC4B36e0781F4eD939C4C1",
      },
      {
        chainId: 910000,
        destCrossChainControl: "0x94a0D851E786C9469664c90D5CE31e9953Cf2b20",
        verifier: "0xa5Beb85D35504F4699EC4B36e0781F4eD939C4C1",
      },
    ],
  },
  421613: {
    supportChains: [
      {
        chainId: 97,
        destCrossChainControl: "0x11975F8FCBF9ED95b45c66F5934431d6356Cee9a",
        verifier: "0x04F76D826596BE89AE7C0D477D0aB6AFB9D61269",
      },
      {
        chainId: 910000,
        destCrossChainControl: "0x94a0D851E786C9469664c90D5CE31e9953Cf2b20",
        verifier: "0x04F76D826596BE89AE7C0D477D0aB6AFB9D61269",
      },
    ],
  },
  910000: {
    supportChains: [
      {
        chainId: 97,
        destCrossChainControl: "0x11975F8FCBF9ED95b45c66F5934431d6356Cee9a",
        verifier: "0xe9376B3a5101EeCb50c50D5b56e72F0Cca986D28",
      },
      {
        chainId: 421613,
        destCrossChainControl: "0xe7011A188A8453CDF846d2C9d5D8eaF3297DBBA2",
        verifier: "0xe9376B3a5101EeCb50c50D5b56e72F0Cca986D28",
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
