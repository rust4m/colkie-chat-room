import { Injectable, Logger } from '@nestjs/common';
import { MessageRequestDto } from '../chat/dto/request/message.request.dto';
import { Message } from './domain/message.entity';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class MessageService {
    private logger: Logger = new Logger(MessageService.name);

    constructor(private readonly messageRepository: MessageRepository) {}

    async create(message: MessageRequestDto & Message): Promise<Message> {
        try {
            return await this.messageRepository.create(message);
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

    async findByUserId(id: string): Promise<Message> {
        try {
            return await this.messageRepository.findByUserId(id);
        } catch (error) {
            throw error;
        }
    }
}
