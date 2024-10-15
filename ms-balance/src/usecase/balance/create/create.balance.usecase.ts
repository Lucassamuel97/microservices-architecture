import { v4 as uuid } from "uuid";
import BalanceRepositoryInterface from "../../../domain/repository/balance-repository.interface";
import { InputCreateBalanceDto, OutputCreateBalanceDto } from "./create.balance.dto";
import Balance from "../../../domain/entity/balance";


export default class CreateBalanceUseCase {
    private balanceRepository: BalanceRepositoryInterface;

    constructor(balanceRepository: BalanceRepositoryInterface) {
        this.balanceRepository = balanceRepository;
    }

    async execute(
        input: InputCreateBalanceDto
    ): Promise<OutputCreateBalanceDto> {
        
        const balance = new Balance(uuid(), input.account_id, input.amount);

        await this.balanceRepository.create(balance);

        return {
            id: balance.id,
            account_id: balance.accountId,
            amount: balance.amount,
        };
    }
}