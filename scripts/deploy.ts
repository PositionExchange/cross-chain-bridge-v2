import { task } from "hardhat/config";
import { readdir } from "fs/promises";
import { MigrationContext, Network, Stage } from "../deploy/types";
import { ContractWrapperFactory } from "../deploy/ContractWrapperFactory";
import { DeployDataStore } from "../deploy/DataStore";
import { MultiSigConfigs } from "../deploy/configs";
import { sleep } from "@nomicfoundation/hardhat-verify/dist/src/utilities";
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
);

task(
  "transferOwnership",
  "Transfer ownership to multi-sig wallet",
  async (
    args: {
      network: Network;
    },
    hre
  ) => {
    const chainId = hre.network.config.chainId || 0;
    const gnosisAddress = MultiSigConfigs[chainId] || "";
    if (gnosisAddress == "") {
      throw new Error(
        `No Gnosis multi-sig wallet configured for chain ${chainId}`
      );
    }
    console.log(
      `Preparing to transfer ownership to ${gnosisAddress}. Sleeping for 10s, if the address is wrong, Ctrl + C now!`
    );
    await sleep(10000);
    console.log(`Transferring ownership to ${gnosisAddress}...`);

    // The owner of the ProxyAdmin can upgrade our contracts
    await hre.upgrades.admin.transferProxyAdminOwnership(gnosisAddress);
    console.log(`Transferred ownership of ProxyAdmin to: ${gnosisAddress}`);
  }
);

export default {};
