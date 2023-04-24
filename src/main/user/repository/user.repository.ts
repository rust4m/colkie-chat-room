import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { Group } from 'src/main/group/domain/group.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userModel: Repository<User>,
    ) {}

    async findById(id: string) {
        try {
            return await this.userModel.findOneBy({ id });
        } catch (error) {
            throw error;
        }
    }

    async create(userBody: User) {
        try {
            const user = this.userModel.create(userBody);
            return await this.userModel.save(user);
        } catch (error) {
            throw error;
        }
    }
}
