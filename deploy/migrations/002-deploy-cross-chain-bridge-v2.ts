import {
  DeployCrossChainBridgeParams,
  MigrationContext,
  MigrationDefinition,
  MultiChainToken,
  Token,
  TokenConfig,
} from "../types";
import { ContractTransaction } from "ethers";
import { TokenConfigs } from "../configs";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy cross chain bridge v2": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 910000; // Default to PSC Testnet
      const crossChainControlAddress = await ctx.db.findAddressByKey(
        "CrossChainControl"
      );

      let operator = "";
      let pauser = "";
      let refunder = "";
      if (ctx.stage == "test") {
        const signers = (await ctx.hre.ethers.getSigners()) || [];
        operator = signers[0].address;
        pauser = signers[0].address;
        refunder = signers[0].address;
      } else {
        // TODO: set operator, pauser, refunder for PROD
      }

      const params: DeployCrossChainBridgeParams = {
        myChainId: chainId,
        crossChainControl: crossChainControlAddress,
        operator: operator,
        pauser: pauser,
        refunder: refunder,
      };

      await ctx.factory.deployCrossChainBridgeV2(params);
    },

    // Run this after deploying a new contract
    "re-config cross chain bridge v2": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 0;
      const crossChainBridgeV2 = await ctx.factory.getCrossChainBridgeV2();

      let tx: Promise<ContractTransaction>;

      // Update dest bridge mapping
      // Update dest token mapping
      const supportChains: TokenConfig[] = TokenConfigs[chainId].supportChains;
      for (const destChain: TokenConfig of supportChains) {
        const srcChainId = chainId;
        const destChainId = destChain.chainId;
        const destBridge = destChain.remoteBridge;

        tx = crossChainBridgeV2.updateBridgeMapping(destChainId, destBridge);
        await ctx.factory.waitTx(
          tx,
          `crossChainBridgeV2.updateBridgeMapping config chain ${destChainId} to bridge ${destBridge}`
        );

        for (const token: MultiChainToken of destChain.supportTokens) {
          const srcToken: Token = token.config[srcChainId];
          const destTokenAddress: string = token.config[destChainId].address;

          tx = crossChainBridgeV2.addContractFirstMapping(
            srcToken.address,
            destChainId,
            destTokenAddress,
            srcToken.decimals,
            srcToken.minTransferAmount,
            srcToken.processMethod,
            srcToken.collectFeeMethod
          );
          await ctx.factory.waitTx(
            tx,
            `crossChainBridgeV2.addContractFirstMapping config ${token.name} to chain ${destChainId}`
          );
        }
      }
    },
  }),
};

export default migrations;
