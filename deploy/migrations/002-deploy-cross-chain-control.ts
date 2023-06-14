import {MigrationContext, MigrationDefinition} from "../types";
import {ContractWrapperFactory} from "../ContractWrapperFactory";


const migrations: MigrationDefinition = {
    getTasks: (context: MigrationContext) => ({
        'deploy cross chain control': async () => {
            /**
             * Currently no param
             */
            if (context.stage == "production") {
                await context.factory.createCrossChainControl({
                    myBlockchainId: 56,
                    timeHorizon: 86400
                })
            }

            await context.factory.createCrossChainControl({
                myBlockchainId: 97,
                timeHorizon: 86400
            })

        }
    })
}


export default migrations;
