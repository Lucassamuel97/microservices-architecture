import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "balances",
    timestamps: false
})
export default class BalanceModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({
        field: "account_id",
        allowNull: false
    })
    declare accountId: string;

    @Column({ allowNull: false })
    declare amount: number;
}