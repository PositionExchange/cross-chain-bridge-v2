import { MigrationContext, MigrationDefinition } from "../types";
import { ContractTransaction } from "ethers";
import { CBCConfigs } from "../configs";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy cross chain control": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 910000; // Default to PSC Testnet
      const timeHorizon: number = 259200; // 3 days

      await ctx.factory.deployCrossChainControl(chainId, timeHorizon);
    },

    // Run this after deploying a new contract
    "re-config cross chain control": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 0;
      const crossChainControl = await ctx.factory.getCrossChainControl();
      const crossChainBridgeV2 = await ctx.factory.getCrossChainBridgeV2();

      let tx: Promise<ContractTransaction>;

      tx = crossChainBridgeV2.updateCrossChainControl(
        crossChainControl.address
      );
      await ctx.factory.waitTx(
        tx,
        "crossChainBridgeV2.updateCrossChainControl"
      );

      const supportChains = CBCConfigs[chainId].supportChains;
      for (const destChain of supportChains) {
        const destChainId: number = destChain.chainId;
        const destCBC: string = destChain.destCrossChainControl;
        const destVerifier: string = destChain.verifier;

        tx = crossChainControl.addRemoteCrossChainControl(destChainId, destCBC);
        await ctx.factory.waitTx(
          tx,
          `crossChainControl.addRemoteCrossChainControl ${destCBC} for chain ${destChainId}`
        );

        tx = crossChainControl.addVerifier(destChainId, destVerifier);
        await ctx.factory.waitTx(
          tx,
          `crossChainControl.addVerifier ${destVerifier} for chain ${destChainId}`
        );
      }
    },
  }),
};

export default migrations;
