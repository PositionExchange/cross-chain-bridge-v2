import { MultiChainToken, MultiChainTokenConfig } from "./types";

export const POSI: MultiChainToken = {
  name: "POSI",
  symbol: "POSI",
  config: {
    97: {
      decimal: 18,
      address: "",
      processMethod: 1,
    },
    421613: {
      decimal: 18,
      address: "",
      processMethod: 1,
    },
    910000: {
      decimal: 18,
      address: "",
      processMethod: 1,
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
  // 421613: {
  //   supportTokens: [POSI],
  //   supportChains: [97, 910000],
  // },
  // 910000: {
  //   supportTokens: [POSI],
  //   supportChains: [97, 421613],
  // },
};
