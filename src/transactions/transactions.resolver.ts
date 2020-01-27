import { Resolver,Query, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { UpdateResult, DeleteResult } from "typeorm";
import { TransactionsService } from "../transactions/transactions.service";
import { Transactions } from "../transactions/transactions.entity";
import { AccountsService } from "../accounts/accounts.service";
import { Accounts } from "../accounts/accounts.entity";

@Resolver('Transactions')
export class TransactionsResolver {
    
    constructor(
        private accountsService: AccountsService,
        private transactionsService: TransactionsService

    ){}

    @Query('transactions')
    async findAll(): Promise<Transactions[]>{
        return await this.transactionsService.findAll();
    }

    @Query('transaction')
    async findOne(@Args('id') id: number): Promise<Transactions>{
        return await this.transactionsService.findOne(id);
    }

    @Mutation('createTransaction')
    async createTransaction(@Args('transaction') transaction: Transactions): Promise<Transactions>{
        return await this.transactionsService.create(transaction);
    }

    @Mutation('updateTransaction')
    async update(@Args('id') id: number, @Args('transaction') transaction: Transactions): Promise<UpdateResult>{
        return await this.transactionsService.update(id, transaction);
    }

    @Mutation('deleteTransaction')
    async delete(@Args('id') id: number): Promise<DeleteResult>{
        return await this.transactionsService.delete(id);
    }
    
    @ResolveProperty('account')
    async getAccount(@Parent() transaction: Transactions): Promise<Accounts>{
        return await this.accountsService.findOne(transaction.account_id);
    }
}