import BalanceRepositoryInterface from "../../../domain/repository/balance-repository.interface";
import CreateBalanceUseCase from "../create/create.balance.usecase";
import FindBalanceUseCase from "../find/find.balance.usecase";
import UpdateBalanceUseCase from "../update/update.balance.usecase";
import { InputUpsertAccountBalanceDto, OutputUpsertAccountBalanceDto } from "./upsertAccount.balance.dto";

export default class UpsertAccountUseCase  {
  private balanceRepository: BalanceRepositoryInterface;
  private createBalanceUseCase: CreateBalanceUseCase;
  private updateBalanceUseCase: UpdateBalanceUseCase;

  constructor(balanceRepository: BalanceRepositoryInterface, createBalanceUseCase: CreateBalanceUseCase, updateBalanceUseCase: UpdateBalanceUseCase) {
    this.balanceRepository = balanceRepository;
    this.createBalanceUseCase = createBalanceUseCase;
    this.updateBalanceUseCase = updateBalanceUseCase;
  }

  async execute(
    input: InputUpsertAccountBalanceDto
  ): Promise<OutputUpsertAccountBalanceDto> {

    const existingAccount  = await this.balanceRepository.findByAccount(input.account_id);
    let output: OutputUpsertAccountBalanceDto;

    if (!existingAccount) {
      output = await this.createBalanceUseCase.execute(input);
    } else {
      let inputUpdate = {
        id: existingAccount.id,
        account_id: input.account_id,
        amount: input.amount
      }
      output = await this.updateBalanceUseCase.execute(inputUpdate);
    }

    return output;
  }
}