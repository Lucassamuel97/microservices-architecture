import CreateBalanceUseCase from "./create.balance.usecase";

const input = {
    account_id: "Ac1",
    amount: 100,
};

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findByAccount: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create balance use case", () => {
    it("should create a balance", async () => {
        const balanceRepository = MockRepository();
        const balanceCreateUseCase = new CreateBalanceUseCase(balanceRepository);

        const output = await balanceCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            account_id: input.account_id,
            amount: input.amount,
        });
    });

});