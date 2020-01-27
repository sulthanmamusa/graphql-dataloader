import { Injectable } from "@nestjs/common";
import { Transactions } from "./transactions.entity";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions) private transactionsRepository: Repository<Transactions>
    ){}

    async findAll(conditions?: any): Promise<Transactions[]>{
        return await this.transactionsRepository.find(conditions);
    }

    async findOne(id: number): Promise<Transactions>{
        return this.transactionsRepository.findOne(id);
    }

    async create(transaction: Transactions): Promise<Transactions>{
        return await this.transactionsRepository.save(transaction);
    }

    async update(id: number, transaction: Transactions): Promise<UpdateResult>{
        return await this.transactionsRepository.update(id, transaction);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.transactionsRepository.delete(id);
    }
}