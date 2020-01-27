import { Injectable } from "@nestjs/common";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { Accounts } from "./accounts.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Accounts) private accountsRepository: Repository<Accounts>
    ){}

    async findAll(conditions?: any): Promise<Accounts[]>{
        return await this.accountsRepository.find(conditions);
    }

    async findOne(id: number): Promise<Accounts>{
        return await this.accountsRepository.findOne(id);
    }

    async create(account: Accounts): Promise<Accounts>{
        return await this.accountsRepository.save(account);
    }

    async update(id: number, account: Accounts): Promise<UpdateResult>{
        return await this.accountsRepository.update(id, account);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.accountsRepository.delete(id);
    }
}