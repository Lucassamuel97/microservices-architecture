import dotenv from "dotenv"
import { setupDb } from "./infrastructure/repository/sequelize/setupDb";
import { listen } from "./infrastructure/api/server";
import { kafka, kafkaGroupId } from "./infrastructure/kafka/config";
import { KafkaConsumer } from "./infrastructure/kafka/consumer";
import { BalanceEventHandler } from "./domain/events/handler/balance.handler";
import BalanceRepository from "./infrastructure/repository/sequelize/balance/balance.repository";
import UpdateBalanceUseCase from "./usecase/balance/update/update.balance.usecase";
import CreateBalanceUseCase from "./usecase/balance/create/create.balance.usecase";
import FindBalanceUseCase from "./usecase/balance/findByAccount/findByAccount.balance.usecase";
import UpsertAccountUseCase from "./usecase/balance/UpsertAccount/upsertAccount.balance.usecase";


(async () => {
    dotenv.config();
    
    console.log("setting up database")
    await setupDb();

    console.log("setting up kafka")
    await setupKafka();

    console.log("listen starting webserver")
    listen();
})();

async function setupKafka() {
    const consumer = kafka.consumer({
        groupId: kafkaGroupId
    });

    const balanceRepository = new BalanceRepository();
    const balanceUpdateUseCase = new UpdateBalanceUseCase(balanceRepository);
    const balancecreateUseCase = new CreateBalanceUseCase(balanceRepository);
    const findBalanceUseCase = new FindBalanceUseCase(balanceRepository);
    const upsertAccountUseCase = new UpsertAccountUseCase(findBalanceUseCase,balancecreateUseCase,balanceUpdateUseCase);

    const updateBalanceHandler = new BalanceEventHandler(upsertAccountUseCase);

    const kafkaConsumer = new KafkaConsumer({
        consumer,
        topics: ['balances'],
        handler: updateBalanceHandler
    });

    try {
        console.log("connecting to kafka")
        await kafkaConsumer.connect();
    } catch (error) {
        console.error;
        await kafkaConsumer.disconnect();
    }
}