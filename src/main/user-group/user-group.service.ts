import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserGroupRepository } from './repository/user-group.repository';
import { UserGroup } from './domain/user-group.entity';

@Injectable()
export class UserGroupService {
    private logger: Logger = new Logger(UserGroupService.name);

    constructor(private readonly userGroupRepository: UserGroupRepository) {}

    async create(userGroup: UserGroup): Promise<UserGroup> {
        try {
            return await this.userGroupRepository.create(userGroup);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<UserGroup> {
        try {
            return await this.userGroupRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }
}
