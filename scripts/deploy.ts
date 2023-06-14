import {task} from "hardhat/config";
import {readdir} from "fs/promises";
import {MigrationContext, Network} from "../deploy/types";
import {ContractWrapperFactory} from "../deploy/ContractWrapperFactory";
import {DeployDataStore} from "../deploy/DataStore";
import path = require("path");

const DATA_STORE_FILE_MAP: { [key: string]: string } = {
    'qc': './deployData_qc.db',
    'posi_devnet': './deployData_posichain_devnet.db',
    'posi_testnet': './deployData_posichain_testnet.db',
    'volta': './deployData_volta.db',
}

task('deploy', 'deploy contracts', async (taskArgs: { task: string }, hre, runSuper) => {
    const basePath = path.join(__dirname, "../deploy/migrations");
    const filenames = await readdir(basePath);
    const network = hre.network.name;
    const dataStoreFileName = DATA_STORE_FILE_MAP[network] || "./deployData_unknown.db"
    console.log(`dataStoreFileName ${dataStoreFileName}`)

    const db = new DeployDataStore(dataStoreFileName)
    const context: MigrationContext = {
        network: network as Network,
        factory: new ContractWrapperFactory(db, hre),
        db,
        hre,
    }

    for (const filename of filenames) {
        console.info(`Start migration: ${filename}`)
        const module = await import(path.join(basePath, filename))
        const tasks = module.default.getTasks(context)
        for (const key of Object.keys(tasks)) {
            if (!taskArgs.task || taskArgs.task == key) {
                console.group(`-- Start run task ${key}`)
                await tasks[key]()
                console.groupEnd()
            }
        }

    }
})
    .addOptionalParam('task', 'Task Name')

export default {}