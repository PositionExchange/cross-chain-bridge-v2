import { MigrationContext, MigrationDefinition } from "../types";

const migrations: MigrationDefinition = {
  getTasks: (context: MigrationContext) => ({
    "deploy primary signature verifier": async () => {
      await context.factory.deployPrimarySignatureVerifier();
    },
  }),
};

export default migrations;
