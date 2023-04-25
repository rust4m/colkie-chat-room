import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './domain/user.entity';
import { UserRequestDto } from '../chat/dto/request/user.request.dto';

@Injectable()
export class UserService {
    private logger: Logger = new Logger(UserService.name);

    constructor(private readonly userRepository: UserRepository) {}

    async create(user: UserRequestDto & User): Promise<User> {
        try {
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
