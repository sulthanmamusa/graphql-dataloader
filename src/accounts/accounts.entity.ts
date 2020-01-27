import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Branches } from '../branches/branches.entity';
import { Transactions } from '../transactions/transactions.entity';
@Entity('accounts')
export class Accounts {
    @PrimaryGeneratedColumn() id: number;

    @Column() branch_id: number;

    @Column() name: string;

    @Column() city: string;

    @Column() street: string;

    @Column() status: boolean;

    @ManyToOne(type => Branches, branches => branches.accounts)
    @JoinColumn({ name:'branch_id'})
    branch: Branches

    @OneToMany(type => Transactions, transactions => transactions.account)
    transactions: Transactions[]
}