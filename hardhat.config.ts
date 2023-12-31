import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-defender";
import "hardhat-docgen";
import {
  ARB_API_KEY, ARB_MAINNET_DEPLOYER_KEY,
  ARB_TESTNET_DEPLOYER_KEY,
  BSC_API_KEY, BSC_MAINNET_DEPLOYER_KEY,
  BSC_TESTNET_DEPLOYER_KEY, PSC_API_KEY, PSC_MAINNET_DEPLOYER_KEY,
  PSC_TESTNET_DEPLOYER_KEY,
} from "./deploy/constants";
import "./scripts/deploy";
import "solidity-coverage";
// TODO enable gas reporter once development done
// import "hardhat-gas-reporter";
// import * as tdly from "@tenderly/hardhat-tenderly";

// tdly.setup({ automaticVerifications: false });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545",
      chainId: 97,
      gasPrice: 10000000000,
      accounts: [BSC_TESTNET_DEPLOYER_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      gasPrice: 5000000000,
      accounts: [BSC_MAINNET_DEPLOYER_KEY],
    },
    pscTestnet: {
      url: "https://api.t.posichain.org/",
      chainId: 910000,
      accounts: [PSC_TESTNET_DEPLOYER_KEY],
    },
    psc: {
      url: "https://api.posichain.org/",
      chainId: 900000,
      accounts: [PSC_MAINNET_DEPLOYER_KEY],
    },
    arbitrumGoerli: {
      url: "https://arbitrum-goerli.public.blastapi.io",
      chainId: 421613,
      gasPrice: 100000000,
      accounts: [ARB_TESTNET_DEPLOYER_KEY],
    },
    arbitrumOne: {
      url: "https://arbitrum-one.publicnode.com",
      chainId: 42161,
      accounts: [ARB_MAINNET_DEPLOYER_KEY],
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.8",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSC_API_KEY,
      bsc: BSC_API_KEY,
      arbitrumGoerli: ARB_API_KEY,
      arbitrumOne: ARB_API_KEY,
      pscTestnet: PSC_API_KEY,
      psc: PSC_API_KEY,
    },
    customChains: [
      {
        network: "pscTestnet",
        chainId: 910000,
        urls: {
          apiURL: "https://explorer-testnet.posichain.org/api",
          browserURL: "https://explorer-testnet.posichain.org",
        },
      },
      {
        network: "psc",
        chainId: 900000,
        urls: {
          apiURL: "https://blockscout.posichain.org/api",
          browserURL: "https://blockscout.posichain.org",
        },
      },
    ],
  },
  defender: {
    apiKey: process.env.DEFENDER_API_KEY,
    apiSecret: process.env.DEFENDER_API_SECRET,
  },
  contractSizer: {
    strict: true,
  },
  mocha: {
    timeout: 100000,
  },
  typechain: {
    outDir: "typeChain",
    target: "ethers-v5",
  },
  docgen: {
    path: "./docs",
  },
};
