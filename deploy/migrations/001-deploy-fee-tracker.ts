import { MigrationContext, MigrationDefinition } from "../types";
import { ContractTransaction } from "ethers";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy fee tracker": async () => {
      await ctx.factory.deployFeeTracker();
    },

    "re-config fee tracker": async () => {
      const feeTracker = await ctx.db.findAddressByKey("FeeTracker");
      const bridge = await ctx.factory.getCrossChainBridgeV2();

      let tx: Promise<ContractTransaction>;

      tx = bridge.updateFeeTracker(feeTracker);
      await ctx.factory.waitTx(tx, `bridge.updateFeeTracker`);
    },
  }),
};

export default migrations;
