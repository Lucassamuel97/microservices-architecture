import Balance from "../../../domain/entity/balance";
import UpdateBalanceUseCase from "./update.balance.usecase";


const balance = new Balance("b1", "ac1", 100);

const input = {
    id: balance.id,
    account_id: balance.accountId,
    amount: balance.amount,
};

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(balance)),
        findByAccount: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for balance update use case", () => {
    it("should update a balance", async () => {
        const balanceRepository = MockRepository();
        const balanceUpdateUseCase = new UpdateBalanceUseCase(balanceRepository);

        const output = await balanceUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("You shouldn't update if you don't find an accountid", async () => {
        const balanceRepository = MockRepository();
        balanceRepository.findById.mockImplementation(() => {
          throw new Error("Balance not found");
        });
        const usecase = new UpdateBalanceUseCase(balanceRepository);
    
        const input = {
            id: "",
            account_id: "123",
            amount: 100
        };
    
        expect(() => {
          return usecase.execute(input);
        }).rejects.toThrow("Balance not found");
      });

});