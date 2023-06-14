import { MigrationContext, MigrationDefinition } from "../types";

const migrations: MigrationDefinition = {
  getTasks: (context: MigrationContext) => ({
    "deploy cross chain control": async () => {
      /**
       * Currently no param
       */
      const chainId: number | undefined = context.hre.network.config.chainId;
      await context.factory.deployCrossChainControl(
        chainId || 910000, // Default to PSC Testnet
        259200 // 3 days
      );
    },
  }),
};

export default migrations;
