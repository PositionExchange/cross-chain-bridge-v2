import {
  MultiChainSignerConfig,
  MultiChainToken,
  MultiChainTokenConfig,
  MultiCrossChainControlConfig,
} from "./types";

export const POSI: MultiChainToken = {
  name: "POSI",
  symbol: "POSI",
  config: {
    97: {
      address: "",
      decimals: 18,
      minTransferAmount: 1000000000000000000,
      processMethod: 1,
      collectFeeMethod: 1
    },
    421613: {
      address: "",
      decimals: 18,
      minTransferAmount: 1000000000000000000,
      processMethod: 1,
      collectFeeMethod: 1
    },
    910000: {
      address: "",
      decimals: 18,
      minTransferAmount: 1000000000000000000,
      processMethod: 1,
      collectFeeMethod: 1
    },
  },
};

export const TokenConfigs: {
  [chainId: number]: MultiChainTokenConfig;
} = {
  97: {
    supportChains: [
      { chainId: 421613, supportTokens: [POSI], remoteBridge: "" },
      { chainId: 910000, supportTokens: [POSI], remoteBridge: "" },
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