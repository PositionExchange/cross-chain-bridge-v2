import {Network} from "./types";

const Datastore = require("nedb-promises");

const DATA_STORE_FILE = {
  bscTestnet: "./deployData_bsc_testnet.db",
  bsc: "./deployData_bsc.db",
  pscTestnet: "./deployData_psc_testnet.db",
  psc: "./deployData_psc.db",
  arbitrumGoerli: "./deployData_arb_goerli.db",
  arbitrumOne: "./deployData_arb_one.db",
};

export class DeployDataStore {
  db: any;

  constructor(network: Network) {
    const filename = DATA_STORE_FILE[network]
    this.db = Datastore.create({
      filename: filename,
      autoload: true,
    });
  }

  async findAddressByKey(key: string): Promise<string> {
    const data = await this.db.findOne({ key: key });
    if (data) {
      return data.address;
    }
    return "";
  }

  async saveAddressByKey(key: string, address: string) {
    return this.db.update(
      {
        key,
      },
      { address, key },
      { upsert: true }
    );
  }

  async listAllContracts() {
    return this.db.find();
  }
}
