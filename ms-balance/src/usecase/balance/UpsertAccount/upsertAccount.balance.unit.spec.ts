import Balance from "../../../domain/entity/balance";
import CreateBalanceUseCase from "../create/create.balance.usecase";
import FindBalanceUseCase from "../findByAccount/findByAccount.balance.usecase";
import UpdateBalanceUseCase from "../update/update.balance.usecase";
import UpsertAccountUseCase from "./upsertAccount.balance.usecase";

const balance = new Balance("b1", "ac1", 100);

const input = {
    account_id: balance.accountId,
    amount: balance.amount,
};

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(balance)),
        findByAccount: jest.fn().mockReturnValue(Promise.resolve(balance)),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for upsert Account balance use case", () => {
    it("should upsert Account a balance", async () => {
        const balanceRepository = MockRepository();
        const balanceUpdateUseCase = new UpdateBalanceUseCase(balanceRepository);
        const balancecreateUseCase = new CreateBalanceUseCase(balanceRepository);
        const findBalanceUseCase = new FindBalanceUseCase(balanceRepository);
        const upsertAccountUseCase = new UpsertAccountUseCase(findBalanceUseCase,balancecreateUseCase,balanceUpdateUseCase);

        const output = await upsertAccountUseCase.execute(input);

        expect(output.id).toBe(balance.id);
        expect(output.account_id).toBe(balance.accountId);
        expect(output.amount).toBe(balance.amount);
    });

});