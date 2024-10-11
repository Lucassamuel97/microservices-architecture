import Balance from "../../../domain/entity/balance";
import FindBalanceUseCase from "./findByAccount.balance.usecase";

const balance = new Balance("b1", "ac123", 100);

const MockRepository = () => {
  return {
    findById: jest.fn(),
    findByAccount: jest.fn().mockReturnValue(Promise.resolve(balance)),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe("Unit Test find Balance use case", () => {
  it("should find a Balance by Account id", async () => {
    const balanceRepository = MockRepository();

    const usecase = new FindBalanceUseCase(balanceRepository);

    const input = {
      account_id: "ac123",
    };

    const output = {
      id: "b1",
      account_id: "ac123",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a Balance", async () => {
    const balanceRepository = MockRepository();
    balanceRepository.findByAccount.mockImplementation(() => {
      throw new Error("Balance not found");
    });
    const usecase = new FindBalanceUseCase(balanceRepository);

    const input = {
      account_id: "ac123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Balance not found");
  });
});