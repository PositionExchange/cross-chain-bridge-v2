import { MigrationContext, MigrationDefinition } from "../types";
import { ContractTransaction, ethers } from "ethers";
import { CrossChainBridgeV2 } from "../../typeChain";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy cross chain control": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 910000; // Default to PSC Testnet
      const timeHorizon: number = 259200; // 3 days

      await ctx.factory.deployCrossChainControl(chainId, timeHorizon);
    },

    // Run this after deploying a new contract
    "re-config cross chain control": async () => {
      const crossChainControl = await ctx.db.findAddressByKey(
        "CrossChainControl"
      );

      const crossChainBridgeV2 =
        await ctx.factory.getDeployedContract<CrossChainBridgeV2>(
          "CrossChainBridgeV2"
        );

      let tx: Promise<ContractTransaction>;

      tx = crossChainBridgeV2.updateCrossChainControl(crossChainControl);
      await ctx.factory.waitTx(tx, "crossChainBridgeV2.updateCrossChainControl");
    },
  }),
};

export default migrations;
