import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-defender";
import "hardhat-docgen";
import {
  ARB_API_KEY,
  ARB_TESTNET_DEPLOYER_KEY,
  BSC_API_KEY,
  BSC_TESTNET_DEPLOYER_KEY,
  PSC_API_KEY,
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
    pscTestnet: {
      url: "https://api.t.posichain.org/",
      chainId: 910000,
      accounts: [PSC_TESTNET_DEPLOYER_KEY],
    },
    arbitrumGoerli: {
      url: "https://snowy-dimensional-wave.arbitrum-goerli.quiknode.pro/5fb1a4cbaec64e964facf89b037dabd44bd73b27/",
      chainId: 421613,
      accounts: [ARB_TESTNET_DEPLOYER_KEY],
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
    ],
  },
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
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
