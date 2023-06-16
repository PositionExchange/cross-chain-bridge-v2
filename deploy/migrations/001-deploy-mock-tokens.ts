import {
  DeployMockTokenParams,
  MigrationContext,
  MigrationDefinition,
} from "../types";
import { MockToken } from "../../typeChain";

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
    minter: "0xf60529ce24A785F532f2E00015CF174Ce1e1E98A",
  },
};

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy mock tokens": async () => {
      if (ctx.stage != "test") return;
      const chainId: number = ctx.hre.network.config.chainId || 0;
      await ctx.factory.deployMockToken(tokenConfig[chainId]);
    },

    "update minter mock tocken": async () => {
      if (ctx.stage != "test") return;
      const chainId: number = ctx.hre.network.config.chainId || 0;
      const tokenContract = await ctx.factory.getDeployedContract<MockToken>(
        "MockToken",
        `MockToken::${tokenConfig[chainId].name}`
      );

      const tx = tokenContract.updateMinter(tokenConfig[chainId].minter);
      await ctx.factory.waitTx(tx, "tokenContract.updateMinter")
    },
  }),
};

export default migrations;
