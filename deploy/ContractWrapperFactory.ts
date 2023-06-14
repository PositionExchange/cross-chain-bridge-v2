import { DeployDataStore } from "./DataStore";
import { HardhatRuntimeEnvironment } from "hardhat/types";
// @ts-ignore
import { HardhatDefenderUpgrades } from "@openzeppelin/hardhat-defender";

export class ContractWrapperFactory {
  defender: HardhatDefenderUpgrades;

  constructor(
    readonly db: DeployDataStore,
    readonly hre: HardhatRuntimeEnvironment
  ) {
    this.defender = hre.defender;
  }

  async getDeployedContract<T>(
    contractId: string,
    contractName?: string
  ): Promise<T> {
    if (!contractName) {
      contractName = contractId;
    }
    const address = await this.db.findAddressByKey(contractId);
    console.log(`ID: ${contractId} Address: ${address}`);
    if (!address) throw new Error(`Contract ${contractId} not found`);
    const contract = await this.hre.ethers.getContractAt(contractName, address);
    return contract as T;
  }

  async verifyProxy(proxyAddress: string) {
    // Ref: https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades#verify
    return this.hre.run("verify", { address: proxyAddress }).catch((e) => {
      console.error(`Verify ${proxyAddress} Error`, e);
    });
  }

  async getImplementation(proxyAddress: string) {
    // Ref: https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades#verify
    return this.hre.upgrades.erc1967.getImplementationAddress(proxyAddress);
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
      await this.verifyProxy(contractAddress);

      const implAddress = await this.getImplementation(contractAddress);
      await this.db.saveAddressByKey(`${contractName}:impl`, implAddress);

      console.log(
        `Upgrade ${contractName} ${contractAddress} to new implementation ${implAddress}`
      );
    } else {
      const instance = await this.hre.upgrades.deployProxy(
        factory,
        contractArgs
      );
      console.log(`wait for deploy ${contractName}`);
      const contract = await instance.deployed();
      const address = await contract.address;
      console.log(`Address ${contractName}: ${address}`);

      await this.db.saveAddressByKey(contractName, address);
      await this.verifyProxy(address);
    }
  }

  async deployCrossChainControl(myBcId: number, timeHorizon: number) {
    await this.deployUpgradeableContract("CrossChainControl", [
      myBcId,
      timeHorizon,
    ]);
  }
}
