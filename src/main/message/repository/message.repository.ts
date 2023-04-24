import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../domain/message.entity';

@Injectable()
export class MessageRepository {
    constructor(
        @InjectRepository(Message)
        private groupModel: Repository<Message>,
    ) {}

    async findById(id: number) {
        try {
            return await this.groupModel.findOneBy({ id });
        } catch (error) {
            throw error;
        }
    }

    async create(groupBody: Message) {
        try {
            const group = this.groupModel.create(groupBody);
            return await this.groupModel.save(group);
        } catch (error) {
            throw error;
        }
    }
}
