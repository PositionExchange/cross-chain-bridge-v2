import { task } from "hardhat/config";
import { readdir } from "fs/promises";
import { MigrationContext, Network, Stage } from "../deploy/types";
import { ContractWrapperFactory } from "../deploy/ContractWrapperFactory";
import { DeployDataStore } from "../deploy/DataStore";
import path = require("path");

task(
  "deploy",
  "deploy contracts",
  async (taskArgs: { stage: Stage; task: string }, hre, runSuper) => {
    const network = hre.network.name as Network;
    const basePath = path.join(__dirname, "../deploy/migrations");
    const filenames = await readdir(basePath);
    const db = new DeployDataStore(network);
    const context: MigrationContext = {
      stage: taskArgs.stage,
      network: network,
      factory: new ContractWrapperFactory(db, hre),
      db,
      hre,
    };

    for (const filename of filenames) {
      console.info(`Start migration: ${filename}`);
      const module = await import(path.join(basePath, filename));
      const tasks = module.default.getTasks(context);
      for (const key of Object.keys(tasks)) {
        if (!taskArgs.task || taskArgs.task == key) {
          console.group(`-- Start run task ${key}`);
          await tasks[key]();
          console.groupEnd();
        }
      }
    }
  }
)
  .addParam("stage", "Stage")
  .addOptionalParam("task", "Task Name");

task(
  "listDeployedContract",
  "list all deployed contracts",
  async (taskArgs: { network: Network }) => {
    const db = new DeployDataStore(taskArgs.network);
    const data = await db.listAllContracts();
    for (const obj of data) {
      console.log(obj.key, obj.address);
    }
  }
).addParam("stage", "Stage");

task(
  "defenderVerify",
  "Verify contracts on Defender",
  async (args: { network: Network; contract: string; url: string }, hre) => {
    const db = new DeployDataStore(args.network);
    const contractAddress = await db.findAddressByKey(args.contract);
    const verification = await hre.defender.verifyDeployment(
      contractAddress,
      args.contract,
      args.url
    );
    console.log(`Verified contract ${contractAddress}`);
  }
).addParam("stage", "Stage");

export default {};
