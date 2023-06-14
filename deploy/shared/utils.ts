import { DeployDataStore } from "../DataStore";
import { Network } from "../types";

const DATA_STORE_FILE = {
  bscTestnet: "./deployData_bsc_testnet.db",
  bsc: "./deployData_bsc.db",
  pscTestnet: "./deployData_psc_testnet.db",
  psc: "./deployData_psc.db",
  arbitrumGoerli: "./deployData_arb_goerli.db",
  arbitrumOne: "./deployData_arb_one.db",
};

export function loadDb(network: Network) {
  return new DeployDataStore(DATA_STORE_FILE[network]);
}
