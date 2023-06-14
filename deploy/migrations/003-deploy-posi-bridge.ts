import {MigrationContext, MigrationDefinition} from "../types";
import {ContractWrapperFactory} from "../ContractWrapperFactory";
import {BigNumber} from "ethers";


const migrations: MigrationDefinition = {
    getTasks: (context: MigrationContext) => ({
        'deploy posi bridge': async () => {
            /**
             * Currently no param
             */

            const crosschainControlAddress = await context.db.findAddressByKey('CrosschainControl');
            if (context.stage == "production") {
                await context.factory.createPosiBridge({
                    crosschainControl: crosschainControlAddress,
                    posiChainTokenHubContract: "0x0000000000000000000000000000000000001001",
                    posiCrosschainControlAddress: "0x0000000000000000000000000000000000002000",
                    minimumTransferAmount: BigNumber.from("10000000000000000000"),
                    posiChainId: 900000
                })
            }

            await context.factory.createPosiBridge({
                crosschainControl: crosschainControlAddress,
                posiChainTokenHubContract: "0x73fCD994A8c25Cb23fD02FCb091c310037B78997",
                posiCrosschainControlAddress: "0x4a591940995ebE98336f91359cE567a43FF11dF3",
                minimumTransferAmount: BigNumber.from("10000000000000000000"),
                posiChainId: 910000
            })
        }
    })
}


export default migrations;
