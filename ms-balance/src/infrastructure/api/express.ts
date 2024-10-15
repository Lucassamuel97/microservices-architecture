import express, { Express } from "express";
import { balanceRoute } from "./routes/balance.route";

export const app: Express = express();
app.use(express.json());
app.use("/balances", balanceRoute);