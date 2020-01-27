import { Module, forwardRef } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { AccountsModule } from '../accounts/accounts.module';
import { Transactions } from './transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([Transactions]),
        forwardRef(() => AccountsModule)
    ],
    providers:[TransactionsResolver, TransactionsService],
    exports:[TransactionsService]
})
export class TransactionsModule {}