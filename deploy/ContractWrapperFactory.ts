import {
    CreateCrosschainControl,
    CreatePosiBridge,
    CreateRelayerHub,
    CreateLightClient,
    CreateSystemReward
} from "./types";
import {DeployDataStore} from "./DataStore";
import {verifyContract} from "../scripts/utils";
import {TransactionResponse} from "@ethersproject/abstract-provider";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {HardhatDefenderUpgrades} from "@openzeppelin/hardhat-defender";


export class ContractWrapperFactory {
    defender: HardhatDefenderUpgrades

    constructor(readonly db: DeployDataStore, readonly hre: HardhatRuntimeEnvironment) {
        this.defender = hre.defender
    }

    async verifyContractUsingDefender(proposal){
        console.log("Upgrade proposal created at:", proposal.url);
        const receipt = await proposal.txResponse.wait()
        console.log(`Contract address ${receipt.contractAddress}`)
        await verifyContract(this.hre, receipt.contractAddress)
    }

    async verifyImplContract(deployTransaction: TransactionResponse) {
        const {data} = deployTransaction
        const decodedData = this.hre.ethers.utils.defaultAbiCoder.decode(
            ['address', 'address'],
            this.hre.ethers.utils.hexDataSlice(data, 4)
        );
        const implContractAddress = decodedData[1]
        const isVerified = await this.db.findAddressByKey(`${implContractAddress}:verified`)
        if (isVerified) return console.log(`Implement contract already verified`)
        console.log("Upgraded to impl contract", implContractAddress)
        try {
            await verifyContract(this.hre, implContractAddress)
            await this.db.saveAddressByKey(`${implContractAddress}:verified`, 'yes')
        } catch (err) {
            if (err.message == 'Contract source code already verified') {
                await this.db.saveAddressByKey(`${implContractAddress}:verified`, 'yes')
            }
            console.error(`-- verify contract error`, err)
        }
    }

    async verifyProxy(proxyAddress){
        // // Ref: https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades#verify
        // return this.hre.run('verify', {address: proxyAddress}).catch(e => {
        //     console.error(`Verify ${proxyAddress} Error`, e)
        // })
    }

    async createPosiBridge(args: CreatePosiBridge) {
        const PosiBridge = await this.hre.ethers.getContractFactory("PosiBridge");
        const posiBridgeContractAddress = await this.db.findAddressByKey(`PosiBridge`);
        if (posiBridgeContractAddress) {
            const proposal = await this.hre.upgrades.upgradeProxy(posiBridgeContractAddress, PosiBridge);
            await proposal.deployed();
            await this.verifyImplContract(proposal.deployTransaction);
        } else {
            const contractArgs = [
                args.crosschainControl,
                args.posiChainTokenHubContract,
                args.posiCrosschainControlAddress,
                args.minimumTransferAmount,
                args.posiChainId
            ];
            console.log("before deploy proxy")
            console.log(contractArgs)
            const instance = await this.hre.upgrades.deployProxy(PosiBridge, contractArgs);
            console.log("wait for deploy posi bridge contract");
            await instance.deployed();
            const address = instance.address.toString().toLowerCase();
            console.log(`PosiBridge contract address : ${address}`)
            await this.db.saveAddressByKey('PosiBridge', address);
            await this.verifyProxy(address)
        }
    }

    async createCrossChainControl(args: CreateCrosschainControl) {
        const CrosschainControl = await this.hre.ethers.getContractFactory("CrosschainControl");
        const crosschainControlContractAddress = await this.db.findAddressByKey(`CrosschainControl`);
        if (crosschainControlContractAddress) {
            const proposal = await this.hre.upgrades.upgradeProxy(crosschainControlContractAddress, CrosschainControl);
            await proposal.deployed()
            await this.verifyImplContract(proposal.deployTransaction);
        } else {
            const contractArgs = [
                args.myBlockchainId,
                args.timeHorizon,
            ];
            console.log("before deploy proxy", contractArgs)
            const instance = await this.hre.upgrades.deployProxy(CrosschainControl, contractArgs);
            console.log("wait for deploy cross chain control contract");
            await instance.deployed();
            const address = instance.address.toString().toLowerCase();
            console.log(`CrosschainControl contract address : ${address}`)
            await this.db.saveAddressByKey('CrosschainControl', address);
            await this.verifyProxy(address)
        }
    }

    async createRelayerHub(args: CreateRelayerHub) {
        const RelayerHub = await this.hre.ethers.getContractFactory("RelayerHub")
        const relayerHubContractAddress = await this.db.findAddressByKey(`RelayerHub`)
        if (relayerHubContractAddress) {
            const proposal = await this.hre.upgrades.upgradeProxy(relayerHubContractAddress, RelayerHub)
            await proposal.deployed()
            await this.verifyImplContract(proposal.deployTransaction)
        } else {
            const contractArgs = [
                args.posiAddress,
                args.systemRewardAddress
            ]
            const instance = await this.hre.upgrades.deployProxy(RelayerHub, contractArgs);
            console.log("wait for deploy relayer hub contract");
            await instance.deployed();
            const address = instance.address.toString().toLowerCase();
            console.log(`RelayerHub contract address : ${address}`)
            await this.db.saveAddressByKey('RelayerHub', address);
            await this.verifyProxy(address)

        }
    }

    async createLightClient(args: CreateLightClient) {
        const LightClient = await this.hre.ethers.getContractFactory("LightClient")
        const lightClientContractAddress = await this.db.findAddressByKey(`LightClient`)
        if (lightClientContractAddress) {
            const proposal = await this.hre.upgrades.upgradeProxy(lightClientContractAddress, LightClient)
            await proposal.deployed()
            await this.verifyImplContract(proposal.deployTransaction)
        } else {
            const contractArgs = [
                args.relayerHubAddress
            ]
            const instance = await this.hre.upgrades.deployProxy(LightClient, contractArgs);
            console.log("wait for deploy light client contract");
            await instance.deployed();
            const address = instance.address.toString().toLowerCase();
            console.log(`LightClient contract address : ${address}`)
            await this.db.saveAddressByKey('LightClient', address);
            await this.verifyProxy(address)

        }
    }

    async createSystemReward(args: CreateSystemReward) {
        const SystemReward = await this.hre.ethers.getContractFactory("SystemReward")
        const systemRewardContractAddress = await this.db.findAddressByKey(`SystemReward`)
        if (systemRewardContractAddress) {
            const proposal = await this.hre.upgrades.upgradeProxy(systemRewardContractAddress, SystemReward)
            await proposal.deployed()
            await this.verifyImplContract(proposal.deployTransaction)
        } else {
            const contractArgs = [
                args.posiAddress
            ]
            const instance = await this.hre.upgrades.deployProxy(SystemReward, contractArgs);
            console.log("wait for deploy system reward contract");
            await instance.deployed();
            const address = instance.address.toString().toLowerCase();
            console.log(`SystemReward contract address : ${address}`)
            await this.db.saveAddressByKey('SystemReward', address);
            await this.verifyProxy(address)
        }
    }
}