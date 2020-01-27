import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Accounts } from "../accounts/accounts.entity";

@Entity('transactions')
export class Transactions {
    @PrimaryGeneratedColumn() id: number;

    @Column() amount: string;

    @Column() creditdebit: string;

    @Column() account_id: number;

    @Column() status: boolean;

    @ManyToOne(type => Accounts, accounts => accounts.transactions)
    @JoinColumn({ name:'account_id'})
    account: Accounts
}