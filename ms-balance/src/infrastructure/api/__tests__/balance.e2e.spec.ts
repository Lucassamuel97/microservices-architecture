import { app } from "../express";
import request from "supertest";
import { listen } from "../server";
import { setupDb, sequelize } from "../../repository/sequelize/setupDb";
import BalanceModel from "../../repository/sequelize/balance/balance.model";

describe("E2E test for balance", () => {
    beforeAll(async () => {
        await setupDb();
        listen();
    });
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize.close();
    });
    it("should find a balance by account ID", async () => {

        const balance = await BalanceModel.create({
            id: "b123",
            accountId: "c123",
            amount: 100,
        });

        const findResponse = await request(app).get("/balances/" + balance.accountId);
        expect(findResponse.status).toBe(200);
        expect(findResponse.body.account_id).toBe("c123");
        expect(findResponse.body.amount).toBe(100);
    });

    it("should not find a balance by account ID", async () => {
        const response = await request(app)
            .get("/balances/1");
        expect(response.status).toBe(500);
    });
});