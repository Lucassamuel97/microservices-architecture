export interface InputCreateBalanceDto {
    account_id: string;
    amount: number;
}

export interface OutputCreateBalanceDto {
    id: string;
    account_id: string;
    amount: number;
}