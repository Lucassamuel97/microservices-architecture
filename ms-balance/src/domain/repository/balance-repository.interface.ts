import Balance from "../entity/balance";

export default interface BalanceRepositoryInterface {
    findById(id: String): Promise<Balance>;
    findByAccount(id: String): Promise<Balance>;
    create(balance: Balance): Promise<void>;
    update(balance: Balance): Promise<void>;
}