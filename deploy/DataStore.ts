const Datastore = require('nedb-promises');

export class DeployDataStore {

    db: typeof Datastore;

    constructor(filename: string) {
        this.db = new Datastore({filename: filename || './deployData_unknown.db', autoload: true});
    }

    async findAddressByKey(key: string): Promise<string | null> {
        const data = await this.db.findOne({key: key})
        if (data) {
            return data.address;
        }
        return null
    }

    async saveAddressByKey(key: string, address: string) {
        return this.db.update({
            key
        }, {address, key}, {upsert: true})
    }
}