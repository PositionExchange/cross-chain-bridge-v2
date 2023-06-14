import { DeployDataStore } from "./DataStore";
import { HardhatRuntimeEnvironment } from "hardhat/types";
// @ts-ignore
import { HardhatDefenderUpgrades } from "@openzeppelin/hardhat-defender";
import { DeployCrossChainBridgeParams } from "./types";
import {ContractTransaction} from "ethers";

export class ContractWrapperFactory {
  defender: HardhatDefenderUpgrades;

  constructor(
    readonly db: DeployDataStore,
    readonly hre: HardhatRuntimeEnvironment
  ) {
    this.defender = hre.defender;
  }

  async getDeployedContract<T>(contractName: string): Promise<T> {
    const address = await this.db.findAddressByKey(contractName);
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
      console.log(`Waiting for tx ${msg}...`)
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

    console.log(
      `Deploy ${contractName} ${proxyAddress} with new implementation ${implAddress}`
    );
  }

  async deployUpgradeableContract(contractName: string, contractArgs: any[]) {
    const factory = await this.hre.ethers.getContractFactory(contractName);
    const contractAddress = await this.db.findAddressByKey(contractName);
    if (contractAddress) {
      const upgraded = await this.hre.upgrades.upgradeProxy(
        contractAddress,
        factory
      );
      await upgraded.deployed();
      await this.saveImplementation(contractName, contractAddress);
      await this.verifyContract(contractAddress);
    } else {
      const instance = await this.hre.upgrades.deployProxy(
        factory,
        contractArgs
      );
      console.log(`wait for deploy ${contractName}`);
      const contract = await instance.deployed();
      const address = await contract.address;

      await this.db.saveAddressByKey(contractName, address);
      console.log(`Address ${contractName}: ${address}`);

      await this.saveImplementation(contractName, address);
      await this.verifyContract(address);
    }
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
