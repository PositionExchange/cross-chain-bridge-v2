import {ContractWrapperFactory} from './ContractWrapperFactory'
import {DeployDataStore} from "./DataStore";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {BigNumber} from "ethers";

export type MigrationTask = () => Promise<void>

export interface MigrationDefinition {
    configPath?: string
    getTasks: (context: MigrationContext) => {
        [taskName: string]: MigrationTask
    }
}

export type Stage = "production" | "staging" | "test"
export type Network = "bsc_testnet" | "bsc_mainnet" | "qc" | "posi_devnet" | "posi_testnet" | "volta"

export interface MigrationContext {
    network: Network
    factory: ContractWrapperFactory
    db: DeployDataStore
    hre: HardhatRuntimeEnvironment
}

export interface CreatePosiBridge {
    crosschainControl: string
    posiChainTokenHubContract: string
    posiCrosschainControlAddress: string
    minimumTransferAmount: BigNumber | string
    posiChainId: number
}

export interface CreateCrosschainControl {
    myBlockchainId: number,
    timeHorizon: number
}

export interface CreateRelayerHub {
    posiAddress: string,
    systemRewardAddress: string
}

export interface CreateLightClient {
    relayerHubAddress: string
}

export interface CreateSystemReward {
    posiAddress: string
}
