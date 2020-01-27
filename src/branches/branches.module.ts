import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BranchesResolver } from './branches.resolver';
import { AccountsModule } from '../accounts/accounts.module';
import { BranchesService } from './branches.service';
import { Branches } from './branches.entity';
@Module({
    imports: [
        forwardRef(() => AccountsModule),
        TypeOrmModule.forFeature([Branches])
    ],
    providers:[BranchesResolver, BranchesService],
    exports:[BranchesService]
})
export class BranchesModule {}