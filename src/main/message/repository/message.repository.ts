import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../domain/message.entity';

@Injectable()
export class MessageRepository {
    constructor(
        @InjectRepository(Message)
        private messageModel: Repository<Message>,
    ) {}

    async findByUserId(id: string) {
        try {
            return await this.messageModel.findOne({
                where: { user: { id } },
                order: { id: 'DESC' },
            });
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        try {
            return await this.messageModel.findOneBy({ id });
        } catch (error) {
            throw error;
        }
    }

    async create(messageBody: Message) {
        try {
            const group = this.messageModel.create(messageBody);
            return await this.messageModel.save(group);
        } catch (error) {
            throw error;
        }
    }
}
