import {
  DeployMockTokenParams,
  MigrationContext,
  MigrationDefinition,
} from "../types";

const tokenConfig: { [chainId: number]: DeployMockTokenParams } = {
  97: {
    name: "POSI",
    symbol: "POSI",
    decimal: 18,
    isRFI: true,
    minter: "0x0000000000000000000000000000000000000000",
  },
  421613: {
    name: "POSI",
    symbol: "POSI",
    decimal: 8,
    isRFI: false,
    minter: "0x126e25C57eC2567368Cc1405f2662622E1e58E29",
  },
};

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy mock tokens": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 0;
      await ctx.factory.deployMockToken(tokenConfig[chainId]);
    },
  }),
};

export default migrations;
