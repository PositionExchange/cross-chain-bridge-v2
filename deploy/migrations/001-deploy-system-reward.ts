import {MigrationContext, MigrationDefinition} from "../types";
import {ContractWrapperFactory} from "../ContractWrapperFactory";


const migrations: MigrationDefinition = {
    getTasks: (context: MigrationContext) => ({
        'deploy system reward': async () => {
            /**
             * Currently no param
             */
            const posiTokenAddress = await context.db.findAddressByKey('PosiToken');
            await context.factory.createSystemReward({
                posiAddress: posiTokenAddress
            })

        }
    })
}


export default migrations;
