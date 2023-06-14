import {MigrationContext, MigrationDefinition} from "../types";
import {ContractWrapperFactory} from "../ContractWrapperFactory";


const migrations: MigrationDefinition = {
    getTasks: (context: MigrationContext) => ({
        'deploy relayer hub': async () => {
            /**
             * Currently no param
             */

            const posiTokenAddress = await context.db.findAddressByKey('PosiToken');
            const systemRewardAddress = await context.db.findAddressByKey('SystemReward');
            await context.factory.createRelayerHub({
                posiAddress: posiTokenAddress,
                systemRewardAddress: systemRewardAddress
            })
        }
    })
}


export default migrations;
