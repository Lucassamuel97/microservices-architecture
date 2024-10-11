import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import BalanceModel from "../repository/sequelize/balance/balance.model";
import { balanceRoute } from "./routes/balance.route";

export const app: Express = express();
app.use(express.json());
app.use("/balances", balanceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([BalanceModel]);
  await sequelize.sync();
}
setupDb();