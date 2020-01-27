import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Accounts } from "../accounts/accounts.entity";

@Entity('branches')
export class Branches {
    @PrimaryGeneratedColumn() id: number;

    @Column() name: string;

    @Column() city: string;

    @Column() assets: string;

    @Column() status: boolean;

    @OneToMany(type => Accounts, accounts => accounts.branch)
    accounts: Accounts[]
}