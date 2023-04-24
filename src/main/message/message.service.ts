import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageRepository } from './repository/message.repository';
import { Message } from './domain/message.entity';
import { UserService } from '../user/user.service';
import { MessageRequestDto } from './dto/request/message.request.dto';

@Injectable()
export class MessageService {
    private logger: Logger = new Logger(MessageService.name);

    constructor(
        private readonly messageRepository: MessageRepository,
        private userService: UserService,
    ) {}

    async create(message: MessageRequestDto): Promise<Message> {
        try {
            const user = await this.userService.findById(message.userId);
            return await this.messageRepository.create({ ...message, user });
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Message> {
        try {
            return await this.messageRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }
}
