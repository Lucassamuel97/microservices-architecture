import Balance from "../../../../domain/entity/balance";
import BalanceRepositoryInterface from "../../../../domain/repository/balance-repository.interface";
import BalanceModel from "./balance.model";

export default class BalanceRepository implements BalanceRepositoryInterface {
    
    async findById(id: String): Promise<Balance> {
        try {
            const balanceModel = await BalanceModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true,
            });
            return new Balance(balanceModel.id, balanceModel.accountId, balanceModel.amount);
        } catch (error) {
            throw new Error(`Balance ${id} not found`);
        }
    }

    async findByAccount(id: String): Promise<Balance> {
        try {
            const balanceModel = await BalanceModel.findOne({
                where: {
                    accountId: id
                },
                rejectOnEmpty: true,
            });
            return new Balance(balanceModel.id, balanceModel.accountId, balanceModel.amount);
        } catch (error) {
            throw new Error(`balance with account Id ${id} not found`);
        }
    }

    async create(entity: Balance): Promise<void> {
        await BalanceModel.create({
            id: entity.id,
            accountId: entity.accountId,
            amount: entity.amount
        });

    }

    async update(entity: Balance): Promise<void> {
        await BalanceModel.update({
            accountId: entity.accountId,
            amount: entity.amount
        }, 
        {
            where: {
                id: entity.id
            }
        });
    }

}