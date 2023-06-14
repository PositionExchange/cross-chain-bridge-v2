import dotenv from "dotenv";

dotenv.config();

export const ARB_API_KEY = process.env["ARB_API_KEY"];
export const ARB_TESTNET_DEPLOYER_KEY = process.env["ARB_TESTNET_DEPLOYER_KEY"];

export const PSC_API_KEY = process.env["PSC_API_KEY"];
export const PSC_TESTNET_DEPLOYER_KEY = process.env["PSC_TESTNET_DEPLOYER_KEY"];

export const BSC_API_KEY = process.env["BSC_API_KEY"];
export const BSC_TESTNET_DEPLOYER_KEY = process.env["BSC_TESTNET_DEPLOYER_KEY"];
