import BalanceRepositoryInterface from "../../../domain/repository/balance-repository.interface";
import { InputFindBalanceDto, OutputFindBalanceDto } from "./find.balance.dto";


export default class FindBalanceUseCase {
    private balanceRepository: BalanceRepositoryInterface;

    constructor(BalanceRepository: BalanceRepositoryInterface) {
        this.balanceRepository = BalanceRepository;
    }

    async execute(input: InputFindBalanceDto): Promise<OutputFindBalanceDto> {
        const balance = await this.balanceRepository.findById(input.id);

        return {
            id: balance.id,
            account_id: balance.accountId,
            amount: balance.amount,
        };
    }
}