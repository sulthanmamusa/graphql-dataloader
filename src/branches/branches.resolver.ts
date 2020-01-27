import { Resolver,Query, Mutation, Args, ResolveProperty, Parent, Context } from "@nestjs/graphql";
import { BranchesService } from "./branches.service";
import { Branches } from "./branches.entity";
import { UpdateResult, DeleteResult } from "typeorm";
import { Accounts } from "../accounts/accounts.entity";
import { ResolvePropertyExtract } from "../query.extract.decorator";

@Resolver('Branches')
export class BranchesResolver {
    
    constructor(
        private branchesService: BranchesService,
    ){}

    @Query('branches')
    async findAll(): Promise<Branches[]>{
        return await this.branchesService.findAll();
    }

    @Query('branch')
    async findOne(@Args('id') id: number): Promise<Branches>{
        return await this.branchesService.findOne(id);
    }

    @Mutation('createBranch')
    async create(@Args('branch') branch: Branches): Promise<Branches>{
        return await this.branchesService.create(branch);
    }

    @Mutation('updateBranch')
    async update(@Args('id') id: number, @Args('branch') branch: Branches): Promise<UpdateResult>{
        return await this.branchesService.update(id, branch);
    }

    @Mutation('deleteBranch')
    async delete(@Args('id') id: number): Promise<DeleteResult>{
        return await this.branchesService.delete(id);
    }

    @ResolveProperty('accounts')
    async getAccount(
        @Parent() branch: Branches,
        @ResolvePropertyExtract(['accounts','branch_id']) rpe: any,
        @Context() ctx: any): Promise<Accounts[]>{
        return await ctx['accounts'].load(branch.id);
    }

}