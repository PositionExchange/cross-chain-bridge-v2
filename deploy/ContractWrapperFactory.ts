import { DeployDataStore } from "./DataStore";
import { HardhatRuntimeEnvironment } from "hardhat/types";
// @ts-ignore
import { DeployCrossChainBridgeParams, DeployMockTokenParams } from "./types";
import { ContractTransaction } from "ethers";
import {
  CrossChainBridgeV2,
  CrossChainControl,
  PrimarySignatureVerifier,
} from "../typeChain";
import { HardhatDefender } from "@openzeppelin/hardhat-defender/src";
import { DefenderSupportedContracts } from "./configs";

export class ContractWrapperFactory {
  defender: HardhatDefender;

  constructor(
    readonly db: DeployDataStore,
    readonly hre: HardhatRuntimeEnvironment
  ) {
    this.defender = hre.defender;
  }

  async getDeployedContract<T>(
    contractName: string,
    contractId?: string
  ): Promise<T> {
    const address = await this.db.findAddressByKey(
      contractId ? contractId : contractName
    );
    if (!address) throw new Error(`Contract ${contractName} not found`);

    console.log(`ID: ${contractName} Address: ${address}`);
    const contract = await this.hre.ethers.getContractAt(contractName, address);
    return contract as T;
  }

  async verifyContract(contractAddress: string) {
    // Ref: https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades#verify
    return this.hre.run("verify", { address: contractAddress }).catch((e) => {
      console.error(`Verify ${contractAddress} Error`, e);
    });
  }

  async waitTx(tx: Promise<ContractTransaction>, msg?: string) {
    if (msg) {
      console.log(`Waiting for tx ${msg}...`);
    }
    const receipt = await (await tx).wait(3);
    console.log(`Tx ${receipt.transactionHash} mined`);
  }

  async getImplementation(proxyAddress: string) {
    return this.hre.upgrades.erc1967.getImplementationAddress(proxyAddress);
  }

  async saveImplementation(contractName: string, proxyAddress: string) {
    const implAddress = await this.getImplementation(proxyAddress);
    await this.db.saveAddressByKey(`${contractName}:impl`, implAddress);
  }

  async deployUpgradeableContract(
    contractName: string,
    contractArgs: any[],
    contractNameSuffix?: string
  ) {
    const factory = await this.hre.ethers.getContractFactory(contractName);
    const contractAddress = await this.db.findAddressByKey(contractName);
    const contractNameFull = contractNameSuffix
      ? `${contractName}:${contractNameSuffix}`
      : contractName;

    if (contractAddress) {
      const chainId = this.hre.network.config.chainId || 0;
      if ((DefenderSupportedContracts[chainId] || []).includes(contractName)) {
        const proposal = await this.defender.proposeUpgrade(
          contractAddress,
          factory
        );
        console.log("Upgrade proposal created at:", proposal.url);
        return;
      }

      const upgraded = await this.hre.upgrades.upgradeProxy(
        contractAddress,
        factory
      );
      await upgraded.deployed();
      await this.saveImplementation(contractNameFull, contractAddress);
      await this.verifyContract(contractAddress);
    } else {
      const instance = await this.hre.upgrades.deployProxy(
        factory,
        contractArgs
      );
      console.log(`wait for deploy ${contractNameFull}`);
      const contract = await instance.deployed();
      const address = await contract.address;

      await this.db.saveAddressByKey(contractNameFull, address);
      console.log(`${contractNameFull} Proxy: ${address}`);

      await this.saveImplementation(contractNameFull, address);
      await this.verifyContract(address);
    }
  }

  async getCrossChainControl(): Promise<CrossChainControl> {
    return this.getDeployedContract<CrossChainControl>("CrossChainControl");
  }

  async getCrossChainBridgeV2(): Promise<CrossChainBridgeV2> {
    return this.getDeployedContract<CrossChainBridgeV2>("CrossChainBridgeV2");
  }

  async getPrimarySignatureVerifier(): Promise<PrimarySignatureVerifier> {
    return this.getDeployedContract<PrimarySignatureVerifier>(
      "PrimarySignatureVerifier"
    );
  }

  async deployMockToken(params: DeployMockTokenParams) {
    await this.deployUpgradeableContract(
      "MockToken",
      [params.name, params.symbol, params.decimal, params.isRFI, params.minter],
      `:${params.name}`
    );
  }

  async deployCrossChainControl(myBcId: number, timeHorizon: number) {
    await this.deployUpgradeableContract("CrossChainControl", [
      myBcId,
      timeHorizon,
    ]);
  }

  async deployCrossChainBridgeV2(params: DeployCrossChainBridgeParams) {
    await this.deployUpgradeableContract("CrossChainBridgeV2", [
      params.myChainId,
      params.crossChainControl,
      params.operator,
      params.pauser,
      params.refunder,
    ]);
  }

  async deployPrimarySignatureVerifier() {
    await this.deployUpgradeableContract("PrimarySignatureVerifier", []);
  }
}
