export interface InputUpsertAccountBalanceDto {
    account_id: string;
    amount: number;
}

export interface OutputUpsertAccountBalanceDto {
    id: string;
    account_id: string;
    amount: number;
}