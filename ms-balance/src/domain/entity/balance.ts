export default class Balance {
    private _id: string;
    private _accountId: string;
    private _amount: number;

    constructor(id: string, accountId: string, amount: number) {
        this._id = id;
        this._accountId = accountId;
        this._amount = amount;
    }

    get id(): string {
        return this._id
    }

    get accountId(): string {
        return this._accountId
    }

    get amount(): number {
        return this._amount
    }

    changeAmount(amount: number){
        this._amount = amount;
    }
}