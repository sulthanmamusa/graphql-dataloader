import { Module, forwardRef } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { BranchesModule } from '../branches/branches.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountsService } from './accounts.service';
import { Accounts } from './accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesService } from '../branches/branches.service';
import { TransactionsService } from '../transactions/transactions.service';
@Module({
    imports:[
        TypeOrmModule.forFeature([Accounts]),
        forwardRef(() => BranchesModule),
        forwardRef(() => TransactionsModule)
    ],
    providers:[AccountsResolver, AccountsService],
    exports:[AccountsService]
})
export class AccountsModule {}