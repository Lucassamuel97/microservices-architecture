export interface InputFindByAccountIDBalanceDto {
    account_id: string;
}

export interface OutputFindByAccountIDBalanceDto {
    id: string;
    account_id: string;
    amount: number;
}