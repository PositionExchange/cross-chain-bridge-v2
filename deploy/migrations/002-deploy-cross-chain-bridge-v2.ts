import {
  DeployCrossChainBridgeParams,
  MigrationContext,
  MigrationDefinition,
} from "../types";

const migrations: MigrationDefinition = {
  getTasks: (context: MigrationContext) => ({
    "deploy cross chain bridge v2": async () => {
      const crossChainControlAddress =
        (await context.db.findAddressByKey("CrossChainControl")) || "";

      let operator = "";
      let pauser = "";
      let refunder = "";
      if (context.stage == "test") {
        const signers = (await context.hre.ethers.getSigners()) || [];
        operator = signers[0].address;
        pauser = signers[0].address;
        refunder = signers[0].address;
      } else {
        // TODO: set operator, pauser, refunder for PROD
      }

      const params: DeployCrossChainBridgeParams = {
        crossChainControl: crossChainControlAddress,
        operator: operator,
        pauser: pauser,
        refunder: refunder,
      };

      await context.factory.deployCrossChainBridgeV2(params);
    },
  }),
};

export default migrations;
