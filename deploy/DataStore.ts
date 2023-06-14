const Datastore = require("nedb-promises");

export class DeployDataStore {
  db: any;

  constructor(filename = undefined) {
    this.db = Datastore.create({
      filename: filename,
      autoload: true,
    });
  }

  async findAddressByKey(key: string): Promise<string | null> {
    const data = await this.db.findOne({ key: key });
    if (data) {
      return data.address;
    }
    return null;
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
