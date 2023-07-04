import {
  DeployCrossChainBridgeParams,
  MigrationContext,
  MigrationDefinition,
  MultiChainToken,
  Token,
  TokenConfig,
} from "../types";
import { ContractTransaction } from "ethers";
import { BridgeConfigs, POSI } from "../configs";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy cross chain bridge v2": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 910000; // Default to PSC Testnet
      const crossChainControlAddress = await ctx.db.findAddressByKey(
        "CrossChainControl"
      );

      const signers = (await ctx.hre.ethers.getSigners()) || [];
      const operator = signers[0].address;
      const pauser = signers[0].address;
      const refunder = signers[0].address;

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
      const supportChains: TokenConfig[] = BridgeConfigs[chainId].supportChains;
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
            srcToken.feePercentage,
            srcToken.feeFlatAmount,
            srcToken.maxFeeAmount,
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

    "CrossChainBridgeV2.setTokenConfig": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 0;
      const crossChainBridgeV2 = await ctx.factory.getCrossChainBridgeV2();

      const posi = POSI.config[chainId];
      const tx = crossChainBridgeV2.setTokenConfig(
        posi.address,
        posi.decimals,
        posi.minTransferAmount,
        posi.feePercentage,
        posi.feeFlatAmount,
        posi.maxFeeAmount,
        posi.processMethod,
        posi.collectFeeMethod
      );
      await ctx.factory.waitTx(
        tx,
        `CrossChainBridgeV2.setTokenConfig(POSI, ${chainId})`
      );
    },
  }),
};

export default migrations;
