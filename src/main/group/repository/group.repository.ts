import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../domain/group.entity';

@Injectable()
export class GroupRepository {
    constructor(
        @InjectRepository(Group)
        private groupModel: Repository<Group>,
    ) {}

    async findById(id: string) {
        try {
            return await this.groupModel.findOneBy({ id });
        } catch (error) {
            throw error;
        }
    }

    async create(groupBody: Group) {
        try {
            const group = this.groupModel.create(groupBody);
            return await this.groupModel.save(group);
        } catch (error) {
            throw error;
        }
    }
}
