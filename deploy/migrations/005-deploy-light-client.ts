import {MigrationContext, MigrationDefinition} from "../types";
import {ContractWrapperFactory} from "../ContractWrapperFactory";


const migrations: MigrationDefinition = {
    getTasks: (context: MigrationContext) => ({
        'deploy light client': async () => {
            /**
             * Currently no param
             */

            const relayerHubAddress = await context.db.findAddressByKey('RelayerHub');
            await context.factory.createLightClient({
                relayerHubAddress: relayerHubAddress
            })
        }
    })
}


export default migrations;
