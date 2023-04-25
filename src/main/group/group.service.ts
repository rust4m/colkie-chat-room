import { Injectable, Logger } from '@nestjs/common';
import { Group } from './domain/group.entity';
import { GroupRepository } from './repository/group.repository';

@Injectable()
export class GroupService {
    private logger: Logger = new Logger(GroupService.name);

    constructor(private readonly groupRepository: GroupRepository) {}

    async create(group: Group): Promise<Group> {
        try {
            return await this.groupRepository.create(group);
        } catch (error) {
            throw error;
        }
    }
}
