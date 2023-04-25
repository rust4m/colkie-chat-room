import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/main/group/domain/group.entity';
import { GroupRepository } from 'src/main/group/repository/group.repository';
import { Message } from 'src/main/message/domain/message.entity';
import { MessageRepository } from 'src/main/message/repository/message.repository';
import { User } from 'src/main/user/domain/user.entity';
import { UserRepository } from 'src/main/user/repository/user.repository';
import { UserGroup } from 'src/main/user-group/domain/user-group.entity';
import { UserGroupRepository } from 'src/main/user-group/repository/user-group.repository';
import { MessageRecipient } from 'src/main/message-recipient/domain/message-recipient.entity';
import { MessageRecipientRepository } from 'src/main/message-recipient/repository/message-recipient.repository';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Group, Message, UserGroup, MessageRecipient])],
    providers: [
        UserRepository,
        GroupRepository,
        MessageRecipientRepository,
        UserGroupRepository,
        MessageRepository,
    ],
    exports: [
        UserRepository,
        GroupRepository,
        MessageRepository,
        UserGroupRepository,
        MessageRecipientRepository,
    ],
})
export class GlobalModule {}
