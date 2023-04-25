import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGroup } from '../domain/user-group.entity';

@Injectable()
export class UserGroupRepository {
    constructor(
        @InjectRepository(UserGroup)
        private userGroupModel: Repository<UserGroup>,
    ) {}

    async findByGroupId(groupId: string) {
        try {
            return await this.userGroupModel.findBy({ groupId });
        } catch (error) {
            throw error;
        }
    }

    async findByUserId(id: string) {
        try {
            return await this.userGroupModel.find({ where: { userId: id } });
        } catch (error) {
            throw error;
        }
    }

    async create(userGroupBody: UserGroup) {
        try {
            const userGroup = this.userGroupModel.create(userGroupBody);
            return await this.userGroupModel.save(userGroup);
        } catch (error) {
            throw error;
        }
    }
}
