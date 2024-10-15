import express, { Request, Response } from "express";
import FindBalanceUseCase from "../../../usecase/balance/findByAccount/findByAccount.balance.usecase";
import BalanceRepository from "../../repository/sequelize/balance/balance.repository";

export const balanceRoute = express.Router();

balanceRoute.get("/:account_id", async (req: Request, res: Response) => {
    const usecase = new FindBalanceUseCase(new BalanceRepository());
    try {
        const output = await usecase.execute({ account_id: req.params.account_id });
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});