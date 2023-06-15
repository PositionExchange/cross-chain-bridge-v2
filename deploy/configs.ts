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
};

export const CBCConfigs: {
  [chainId: number]: MultiCrossChainControlConfig;
} = {
  97: {
    supportChains: [
      { chainId: 421613, destCrossChainControl: "", verifier: "" },
    ],
  },
};

export const SignerConfigs: {
  [chainId: number]: MultiChainSignerConfig;
} = {
  97: {
    supportChains: [{ chainId: 421613, signer: "" }],
  },
};
