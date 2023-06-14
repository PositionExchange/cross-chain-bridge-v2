import { MigrationContext, MigrationDefinition } from "../types";

const migrations: MigrationDefinition = {
  getTasks: (context: MigrationContext) => ({
    "deploy cross chain control": async () => {
      const chainId: number = context.hre.network.config.chainId || 910000; // Default to PSC Testnet
      const timeHorizon: number = 259200; // 3 days

      await context.factory.deployCrossChainControl(chainId, timeHorizon);
    },
  }),
};

export default migrations;
