import { ContractWrapperFactory } from "./ContractWrapperFactory";
import { DeployDataStore } from "./DataStore";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {BigNumber} from "ethers";

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
  address: string;
  decimals: number;
  minTransferAmount: BigNumber;
  feePercentage: number;
  feeFlatAmount: BigNumber;
  processMethod: number;
  collectFeeMethod: number;
  maxFeeAmount: BigNumber;
}

type ChainConfig<T> = {
  [chainId: number]: T;
};

export interface MultiCrossChainControlConfig {
  supportChains: CrossChainControlConfig[];
}

export interface CrossChainControlConfig {
  chainId: number;
  verifier: string;
  destCrossChainControl: string;
}

export interface MultiChainTokenConfig {
  supportChains: TokenConfig[];
}

export interface TokenConfig {
  chainId: number;
  remoteBridge: string;
  supportTokens: MultiChainToken[];
}

export interface MultiChainSignerConfig {
  supportChains: SignerConfig[];
}

export interface SignerConfig {
  chainId: number;
  signer: string;
}

export interface DeployMockTokenParams {
  name: string;
  symbol: string;
  decimal: number;
  isRFI: boolean;
  minter: string;
}

export interface DeployCrossChainBridgeParams {
  myChainId: number;
  crossChainControl: string;
  operator: string;
  pauser: string;
  refunder: string;
}
