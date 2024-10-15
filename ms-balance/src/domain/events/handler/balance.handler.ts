
import { BalanceEvent, mapKafkaEventToBalanceEvent } from '../../../domain/events/balance-event';
import { EventHandler } from '../../../infrastructure/kafka/event.handler.interface';
import UpsertAccountUseCase from '../../../usecase/balance/UpsertAccount/upsertAccount.balance.usecase';

export class BalanceEventHandler implements EventHandler {

    private readonly _upsertAccountBalanceUseCase: UpsertAccountUseCase;

    constructor(UpsertAccountBalanceUseCase: UpsertAccountUseCase) {
        this._upsertAccountBalanceUseCase = UpsertAccountBalanceUseCase;
    }

    async handle(event: any): Promise<void> {
        console.log('####### teste BalanceEventHandler: ', event);
        const input = mapKafkaEventToBalanceEvent(event);
        await this.updateBalances(input);
    }

    private async updateBalances(event: BalanceEvent) {
        const input1 = {
            account_id: event.accountIdFrom,
            amount: event.balanceFrom
        };
        const input2 = {
            account_id: event.accountIdTo,
            amount: event.balanceTo
        };
        await Promise.all([
            this._upsertAccountBalanceUseCase.execute(input1),
            this._upsertAccountBalanceUseCase.execute(input2)
        ]);
    }
}