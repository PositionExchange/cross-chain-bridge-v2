import { task } from "hardhat/config";
import { readdir } from "fs/promises";
import { MigrationContext, Network, Stage } from "../deploy/types";
import { ContractWrapperFactory } from "../deploy/ContractWrapperFactory";
import { loadDb } from "../deploy/shared/utils";
import path = require("path");

task(
  "deploy",
  "deploy contracts",
  async (taskArgs: { stage: Stage; task: string }, hre, runSuper) => {
    const network = hre.network.name as Network;
    const basePath = path.join(__dirname, "../deploy/migrations");
    const filenames = await readdir(basePath);
    const db = loadDb(network);
    const context: MigrationContext = {
      stage: taskArgs.stage,
      network: network,
      factory: new ContractWrapperFactory(
        db,
        hre
      ),
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
    const db = loadDb(taskArgs.network);
    const data = await db.listAllContracts();
    for (const obj of data) {
      console.log(obj.key, obj.address);
    }
  }
).addParam("stage", "Stage");

export default {};
