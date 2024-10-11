import BalanceRepositoryInterface from "../../../domain/repository/balance-repository.interface";
import { InputFindByAccountIDBalanceDto, OutputFindByAccountIDBalanceDto } from "./findByAccount.balance.dto";

export default class FindBalanceUseCase {
    private balanceRepository: BalanceRepositoryInterface;

    constructor(BalanceRepository: BalanceRepositoryInterface) {
        this.balanceRepository = BalanceRepository;
    }

    async execute(input: InputFindByAccountIDBalanceDto): Promise<OutputFindByAccountIDBalanceDto> {
        const balance = await this.balanceRepository.findByAccount(input.account_id);

        return {
            id: balance.id,
            account_id: balance.accountId,
            amount: balance.amount,
        };
    }
}