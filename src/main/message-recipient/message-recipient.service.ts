import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MessageRecipientRepository } from './repository/message-recipient.repository';
import { MessageRecipientRequestDto } from './dto/request/message-recipient.request.dto';
import { MessageRecipient } from './domain/message-recipient.entity';

@Injectable()
export class MessageRecipientService {
    private logger: Logger = new Logger(MessageRecipientService.name);

    constructor(private readonly messageRecipientRepository: MessageRecipientRepository) {}

    async create(messageRecipient: MessageRecipientRequestDto): Promise<MessageRecipient> {
        try {
            return await this.messageRecipientRepository.create(messageRecipient);
        } catch (error) {
            throw error;
        }
    }

    async findByUserGroupId(id: string): Promise<MessageRecipient[]> {
        try {
            return await this.messageRecipientRepository.findByUserGroupId(id);
        } catch (error) {
            throw error;
        }
    }
}
