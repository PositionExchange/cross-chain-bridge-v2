import { MigrationContext, MigrationDefinition } from "../types";
import { MultiSigConfigs } from "../configs";
import { sleep } from "@nomicfoundation/hardhat-verify/dist/src/utilities";

const migrations: MigrationDefinition = {
  getTasks: (ctx: MigrationContext) => ({
    "transfer ownership primary signature verifier": async () => {
      const gnosisAddress = getGnosisAddress(ctx);
      const verifier = await ctx.factory.getPrimarySignatureVerifier();
      await prepareTransferOwnership(
        "PrimarySignatureVerifier",
        verifier.address,
        gnosisAddress
      );

      await ctx.factory.waitTx(
        verifier.transferOwnership(gnosisAddress),
        `PrimarySignatureVerifier.transferOwnership(${gnosisAddress})`
      );
    },

    "transfer ownership cross chain control": async () => {
      const gnosisAddress = getGnosisAddress(ctx);
      const crossChainControl = await ctx.factory.getCrossChainControl();
      await prepareTransferOwnership(
        "CrossChainControl",
        crossChainControl.address,
        gnosisAddress
      );

      await ctx.factory.waitTx(
        crossChainControl.transferOwnership(gnosisAddress),
        `CrossChainControl.transferOwnership(${gnosisAddress})`
      );
    },

    "transfer ownership cross chain bridge v2": async () => {
      const gnosisAddress = getGnosisAddress(ctx);
      const crossChainBridgeV2 = await ctx.factory.getCrossChainBridgeV2();
      await prepareTransferOwnership(
        "CrossChainBridgeV2",
        crossChainBridgeV2.address,
        gnosisAddress
      );

      const roles: string[] = [
        await crossChainBridgeV2.DEFAULT_ADMIN_ROLE(),
        await crossChainBridgeV2.OPERATOR_ROLE(),
        await crossChainBridgeV2.PAUSER_ROLE(),
        await crossChainBridgeV2.REFUNDER_ROLE(),
      ];

      for (const role: string of roles) {
        await ctx.factory.waitTx(
          crossChainBridgeV2.grantRole(role, gnosisAddress),
          `CrossChainBridgeV2.grantRole(${role}, ${gnosisAddress})`
        );
      }

      const signers = (await ctx.hre.ethers.getSigners()) || [];
      const signer = (signers[0] && signers[0].address) || "";

      console.log(
        `Preparing to revoke ownership of ${signer} from CrossChainBridgeV2. Sleeping for 10s, if the address is wrong, Ctrl + C now!`
      );
      await sleep(10000);
      console.log(`Revoking ownership of ${signer} from CrossChainBridgeV2...`);

      for (const role: string of roles) {
        await ctx.factory.waitTx(
          crossChainBridgeV2.revokeRole(role, signer),
          `CrossChainBridgeV2.revokeRole(${role}, ${signer})`
        );
      }
    },
  }),
};

const getGnosisAddress: (ctx: MigrationContext) => string = (
  ctx: MigrationContext
) => {
  const chainId = ctx.hre.network.config.chainId || 0;
  const gnosisAddress = MultiSigConfigs[chainId] || "";
  if (gnosisAddress == "") {
    throw new Error(
      `No Gnosis multi-sig wallet configured for chain ${chainId}`
    );
  }
  return gnosisAddress;
};

const prepareTransferOwnership: (
  name: string,
  address: string,
  gnosis: string
) => void = async (name: string, address: string, gnosis: string) => {
  console.log(
    `Preparing to transfer ownership of contract ${name} ${address} to ${gnosis}. Sleeping for 10s, if the address is wrong, Ctrl + C now!`
  );
  await sleep(10000);
  console.log(`Transferring ownership to ${gnosis}...`);
};

export default migrations;
