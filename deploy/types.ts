import { ContractWrapperFactory } from "./ContractWrapperFactory";
import { DeployDataStore } from "./DataStore";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export type MigrationTask = () => Promise<void>;

export interface MigrationDefinition {
  configPath?: string;
  getTasks: (context: MigrationContext) => {
    [taskName: string]: MigrationTask;
  };
}

export type Stage = "production" | "test";
export type Network = "bscTestnet" | "pscTestnet" | "arbitrumGoerli";

export interface MigrationContext {
  stage: Stage;
  network: Network;
  factory: ContractWrapperFactory;
  db: DeployDataStore;
  hre: HardhatRuntimeEnvironment;
}

export interface MultiChainToken {
  name: string;
  symbol: string;
  config: ChainConfig<Token>;
}

export interface Token {
  decimal: number;
  address: string;
  processMethod: number;
}

type ChainConfig<T> = {
  [chainId: number]: T;
};

export interface MultiChainTokenConfig {
  supportChains: SupportChain[];
}

export interface SupportChain {
  chainId: number;
  remoteBridge: string;
  supportTokens: MultiChainToken[];
}

export interface DeployCrossChainBridgeParams {
  myChainId: number;
  crossChainControl: string;
  operator: string;
  pauser: string;
  refunder: string;
}
