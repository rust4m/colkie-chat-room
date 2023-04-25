import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRecipient } from '../domain/message-recipient.entity';

@Injectable()
export class MessageRecipientRepository {
    constructor(
        @InjectRepository(MessageRecipient)
        private messageRecipientModel: Repository<MessageRecipient>,
    ) {}

    async findByUserGroupId(userGroupId: string) {
        try {
            return await this.messageRecipientModel.findBy({ userGroupId });
        } catch (error) {
            throw error;
        }
    }

    async create(messageBody: MessageRecipient) {
        try {
            const messageRecipient = this.messageRecipientModel.create(messageBody);
            return await this.messageRecipientModel.save(messageRecipient);
        } catch (error) {
            throw error;
        }
    }
}
