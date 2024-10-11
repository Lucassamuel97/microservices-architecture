import { Sequelize } from "sequelize-typescript";
import BalanceModel from "./balance.model";
import BalanceRepository from "./balance.repository";
import Balance from "../../../../domain/entity/balance";


describe("Balance repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([BalanceModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a balance", async () => {
        const balanceRepository = new BalanceRepository();
        const balance = new Balance("b1234", "ac1", 100);

        await balanceRepository.create(balance);

        const balanceModel = await BalanceModel.findOne({ where: { id: "b1234" } });

        expect(balanceModel.toJSON()).toStrictEqual({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });
    });

    it("should update a balance", async () => {
        const balanceRepository = new BalanceRepository();
        const balance = new Balance("b1234", "ac1", 100);

        await balanceRepository.create(balance);

        const balanceModel = await BalanceModel.findOne({ where: { id: "b1234" } });

        expect(balanceModel.toJSON()).toStrictEqual({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });

        balance.changeAmount(300);

        await balanceRepository.update(balance);

        const updatedBalanceModel = await BalanceModel.findOne({ where: { id: "b1234" } });

        expect(updatedBalanceModel.toJSON()).toStrictEqual({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });
    });

    it("should find balance by id", async () => {
        const balanceRepository = new BalanceRepository();

        const balance = new Balance("b1234", "ac1", 100);

        await BalanceModel.create({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });

        const balanceModel = await balanceRepository.findById(balance.id);

        expect(balanceModel).toStrictEqual(balance);
    });

    it("should thrown an error given an invalid id when find balance by id", async () => {
        const balanceRepository = new BalanceRepository();

        const id = "b123";

        expect(() => balanceRepository.findById(id))
            .rejects.toThrow(`Balance ${id} not found`)
    });

    it("should find balance by Account id", async () => {
        const balanceRepository = new BalanceRepository();

        const balance = new Balance("b1234", "ac1", 100);

        await BalanceModel.create({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });

        const balanceModel = await balanceRepository.findByAccount(balance.accountId);

        expect(balanceModel).toStrictEqual(balance);
    });

    it("should thrown an error given an invalid id when find balance by Account id", async () => {
        const balanceRepository = new BalanceRepository();

        const id = "b123";

        expect(() => balanceRepository.findByAccount(id))
            .rejects.toThrow(`balance with account Id ${id} not found`)
    });
});