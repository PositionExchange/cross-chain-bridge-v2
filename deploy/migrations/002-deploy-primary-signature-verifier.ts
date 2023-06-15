import { MigrationContext, MigrationDefinition, SignerConfig } from "../types";
import { SignerConfigs } from "../configs";
import { ContractTransaction } from "ethers";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "deploy primary signature verifier": async () => {
      await ctx.factory.deployPrimarySignatureVerifier();
    },

    "re-config primary signature verifier": async () => {
      const chainId: number = ctx.hre.network.config.chainId || 0;
      const verifier = await ctx.factory.getPrimarySignatureVerifier();

      let tx: Promise<ContractTransaction>;

      const supportChains: SignerConfig[] =
        SignerConfigs[chainId].supportChains;
      for (const destChain: SignerConfig of supportChains) {
        const destChainId = destChain.chainId;
        const destSigner = destChain.signer;

        tx = verifier.updateSigner(destChainId, destSigner);
        await ctx.factory.waitTx(
          tx,
          `primarySignatureVerifier.updateSigner ${destSigner} for chain ${destChainId}`
        );
      }
    },
  }),
};

export default migrations;
