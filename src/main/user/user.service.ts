import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './domain/user.entity';
import { Group } from '../group/domain/group.entity';

@Injectable()
export class UserService {
    private logger: Logger = new Logger(UserService.name);

    constructor(private readonly userRepository: UserRepository) {}

    async create(user: any): Promise<User> {
        try {
            const groupIds = [];

            for (let idx = 0; idx < user.groupIds.length; idx++) {
                const group = new Group();

                group.id = user.groupIds[idx];
                groupIds.push(group);
            }

            user.groups = groupIds;

            return await this.userRepository.create(user);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<User> {
        try {
            return await this.userRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }
}
