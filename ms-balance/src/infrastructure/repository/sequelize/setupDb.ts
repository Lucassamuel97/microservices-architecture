import { Sequelize } from "sequelize-typescript";
import BalanceModel from "./balance/balance.model";

export let sequelize: Sequelize

export async function setupDb() {
    const database = process.env.DB_NAME || "ms_balance";
    const username = process.env.DB_USERNAME || "root";
    const password = process.env.DB_PASSWORD || "root";
    const host = process.env.DB_HOST || "mysql";
    sequelize = new Sequelize(database, username, password, {
        host,
        dialect: 'mysql',
        logging: false,
    });

    try {
        await sequelize.addModels([BalanceModel]);
        await sequelize.sync();
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}