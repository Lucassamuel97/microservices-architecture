import Balance from "./balance"

describe("Balance unit tests", () => {
    it("should create balance successfully", () => {
        const balance = new Balance("b1", "ac1", 100);

        expect(balance).toBeDefined();
        expect(balance.id).toEqual("b1");
        expect(balance.accountId).toEqual("ac1");
        expect(balance.amount).toEqual(100)
    });

    it("should update balance amount", () => {
        const balance = new Balance("b1", "ac1", 100);
        
        balance.changeAmount(200);

        expect(balance.amount).toEqual(200);
    });
})