import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const ROOT_DIR = __dirname;
export const SRC_DIR_NAME = "src";
const LEGACY_SRC_DIR_NAME = join(SRC_DIR_NAME, "legacy");

export const PRIV_TESTNET_ACCOUNT = process.env["PRIV_TESTNET_ACCOUNT"] || "";
export const PRIV_MAINNET_ACCOUNT = process.env["PRIV_MAINNET_ACCOUNT"] || "";
export const PRIV_POSI_CHAIN_TESTNET_ACCOUNT =
  process.env["PRIV_POSI_CHAIN_TESTNET_ACCOUNT"] || "";

export const ARB_API_KEY = process.env["ARB_API_KEY"];
export const ARB_TESTNET_DEPLOYER_KEY = process.env["ARB_TESTNET_DEPLOYER_KEY"];

export const PSC_API_KEY = process.env["PSC_API_KEY"];
export const PSC_TESTNET_DEPLOYER_KEY = process.env["PSC_TESTNET_DEPLOYER_KEY"];

export const BSC_API_KEY = process.env["BSC_API_KEY"];
export const BSC_TESTNET_DEPLOYER_KEY = process.env["BSC_TESTNET_DEPLOYER_KEY"];