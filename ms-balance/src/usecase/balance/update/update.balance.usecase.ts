import BalanceRepositoryInterface from "../../../domain/repository/balance-repository.interface";
import { InputUpdateBalanceDto, OutputUpdateBalanceDto } from "./update.balance.dto";


export default class UpdateBalanceUseCase {
  private balanceRepository: BalanceRepositoryInterface;
  constructor(balanceRepository: BalanceRepositoryInterface) {
    this.balanceRepository = balanceRepository;
  }

  async execute(
    input: InputUpdateBalanceDto
  ): Promise<OutputUpdateBalanceDto> {

    const balance = await this.balanceRepository.findById(input.id);
    
    balance.changeAmount(input.amount);
  
    await this.balanceRepository.update(balance);

    return {
      id: balance.id,
      account_id: balance.accountId,
      amount: balance.amount,
    };
  }
}