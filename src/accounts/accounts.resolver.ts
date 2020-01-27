import { Resolver,Query, Mutation, Args, ResolveProperty, Parent, Context } from "@nestjs/graphql";
import { AccountsService } from "./accounts.service";
import { Accounts } from "./accounts.entity";
import { UpdateResult, DeleteResult } from "typeorm";
import { Branches } from "../branches/branches.entity";
import { Transactions } from "../transactions/transactions.entity";
import { ResolvePropertyExtract } from "../query.extract.decorator";

@Resolver('Accounts')
export class AccountsResolver {
    
    constructor(private accountsService: AccountsService){}

    @Query('accounts')
    async findAll(conditions?: any): Promise<Accounts[]>{
        return await this.accountsService.findAll(conditions);
    }

    @Query('account')
    async findOne(@Args('id') id: number): Promise<Accounts>{
        return await this.accountsService.findOne(id);
    }

    @Mutation('createAccount')
    async createAccount(@Args('account') account: Accounts): Promise<Accounts>{
        return await this.accountsService.create(account);
    }

    @Mutation('updateAccount')
    async update(@Args('id') id: number, @Args('account') account: Accounts): Promise<UpdateResult>{
        return await this.accountsService.update(id, account);
    }

    @Mutation('deleteAccount')
    async delete(@Args('id') id: number): Promise<DeleteResult>{
        return await this.accountsService.delete(id);
    }
    
    @ResolveProperty('branch')
    async getBranch(
        @Parent() account: Accounts,
        @ResolvePropertyExtract('branch') rpe: any,
        @Context() ctx: any): Promise<Branches>{
            return await ctx['branch'].load(account.branch_id);
    }

    @ResolveProperty('transactions')
    async getTransactions(
        @Parent() account: Accounts,
        @ResolvePropertyExtract(['transactions','account_id']) rpe: any,
        @Context() ctx: any): Promise<Transactions[]>{
            return await ctx['transactions'].load(account.id);
    }

}