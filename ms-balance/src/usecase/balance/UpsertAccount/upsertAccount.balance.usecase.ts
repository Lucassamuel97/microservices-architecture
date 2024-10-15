import BalanceRepositoryInterface from "../../../domain/repository/balance-repository.interface";
import CreateBalanceUseCase from "../create/create.balance.usecase";
import FindBalanceUseCase from "../findByAccount/findByAccount.balance.usecase";
import UpdateBalanceUseCase from "../update/update.balance.usecase";
import { InputUpsertAccountBalanceDto, OutputUpsertAccountBalanceDto } from "./upsertAccount.balance.dto";

export default class UpsertAccountUseCase  {
  private findBalanceRepository: FindBalanceUseCase;
  private createBalanceUseCase: CreateBalanceUseCase;
  private updateBalanceUseCase: UpdateBalanceUseCase;

  constructor(findBalanceRepository: FindBalanceUseCase, createBalanceUseCase: CreateBalanceUseCase, updateBalanceUseCase: UpdateBalanceUseCase) {
    this.findBalanceRepository = findBalanceRepository;
    this.createBalanceUseCase = createBalanceUseCase;
    this.updateBalanceUseCase = updateBalanceUseCase;
  }

  async execute(
    input: InputUpsertAccountBalanceDto
  ): Promise<OutputUpsertAccountBalanceDto> {

    let existingAccount;

    try {
      // Tenta encontrar o saldo da conta
      existingAccount = await this.findBalanceRepository.execute({ account_id: input.account_id });
    } catch (error) {
      // Se o saldo não for encontrado, cria um novo saldo
      existingAccount = await this.createBalanceUseCase.execute(input);
    }
  
    // Se o saldo existir, atualiza o saldo
    if (existingAccount && existingAccount.id) {
      const inputUpdate = {
        id: existingAccount.id,
        account_id: input.account_id,
        amount: input.amount
      };
      
      existingAccount = await this.updateBalanceUseCase.execute(inputUpdate);
    }
  
    return existingAccount;
  }
}