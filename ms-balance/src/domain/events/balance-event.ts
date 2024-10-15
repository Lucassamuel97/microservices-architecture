export class BalanceEvent {
    public accountIdFrom: string;
    public accountIdTo: string;
    public balanceFrom: number;
    public balanceTo: number;

    constructor(
        accountIdFrom: string,
        accountIdTo: string,
        balanceFrom: number,
        balanceTo: number
    ) {
        this.accountIdFrom = accountIdFrom;
        this.accountIdTo = accountIdTo;
        this.balanceFrom = balanceFrom;
        this.balanceTo = balanceTo;
    }
}

export function mapKafkaEventToBalanceEvent(kafkaEvent: any): BalanceEvent {
    const { account_id_from, account_id_to, balance_account_id_from, balance_account_id_to } = kafkaEvent.Payload;

    // Instancia o BalanceEvent com os dados do evento Kafka
    return new BalanceEvent(
        account_id_from,
        account_id_to,
        balance_account_id_from,
        balance_account_id_to
    );
}