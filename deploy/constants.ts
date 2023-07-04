import dotenv from "dotenv";

dotenv.config();

export const ARB_API_KEY = process.env["ARB_API_KEY"];
export const ARB_TESTNET_DEPLOYER_KEY = process.env["ARB_TESTNET_DEPLOYER_KEY"];

export const PSC_API_KEY = process.env["PSC_API_KEY"];
export const PSC_TESTNET_DEPLOYER_KEY = process.env["PSC_TESTNET_DEPLOYER_KEY"];

export const BSC_API_KEY = process.env["BSC_API_KEY"];
export const BSC_TESTNET_DEPLOYER_KEY = process.env["BSC_TESTNET_DEPLOYER_KEY"];

export const TOKEN_PROCESS_METHOD_NONE = 0;
export const TOKEN_PROCESS_METHOD_MINTER = 1;
export const TOKEN_PROCESS_METHOD_MC = 2;

export const COLLECT_FEE_METHOD_NONE = 0;
export const COLLECT_FEE_METHOD_FLAT = 1;
export const COLLECT_FEE_METHOD_PERCENTAGE = 2;
export const COLLECT_FEE_METHOD_RFI_N_FLAT = 3;
export const COLLECT_FEE_METHOD_RFI_N_PERCENTAGE = 4;
