import { Injectable } from "@nestjs/common";
import { Branches } from "./branches.entity";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BranchesService {
    constructor(
        @InjectRepository(Branches) private branchesRepository: Repository<Branches>
    ){}

    async findAll(): Promise<Branches[]>{
        return await this.branchesRepository.find();
    }

    async findOne(id: number): Promise<Branches>{
        return await this.branchesRepository.findOne(id);
    }

    async create(branch: Branches): Promise<Branches>{
        return await this.branchesRepository.save(branch);
    }

    async update(id: number, branch: Branches): Promise<UpdateResult>{
        return await this.branchesRepository.update(id, branch);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.branchesRepository.delete(id);
    }
}