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

export type Stage = "production" | "staging" | "test";
export type Network = "bscTestnet" | "pscTestnet" | "arbitrumGoerli";

export interface MigrationContext {
  stage: Stage;
  network: Network;
  factory: ContractWrapperFactory;
  db: DeployDataStore;
  hre: HardhatRuntimeEnvironment;
}
