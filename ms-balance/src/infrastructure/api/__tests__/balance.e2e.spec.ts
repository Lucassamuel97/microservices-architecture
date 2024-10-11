import { app, sequelize } from "../express";
import request from "supertest";
import { listen } from "../server";
import { setupDb } from "../../repository/sequelize/setupDb";

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
    it("should find a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product",
                price: 40,
            });
        expect(response.status).toBe(200);

        const findResponse = await request(app).get("/product/" + response.body.id);
        expect(findResponse.status).toBe(200);
        expect(findResponse.body.name).toBe("Product");
        expect(findResponse.body.price).toBe(40);
    });

    it("should not find a product with invalid id", async () => {
        const response = await request(app)
            .get("/product/1");
        expect(response.status).toBe(500);
    });
});