import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroupRepository } from './repository/group.repository';
import { Group } from './domain/group.entity';

@Injectable()
export class GroupService {
    private logger: Logger = new Logger(GroupService.name);

    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly configService: ConfigService,
    ) {}

    async create(group: Group): Promise<Group> {
        try {
            return await this.groupRepository.create(group);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<Group> {
        try {
            return await this.groupRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }
}
