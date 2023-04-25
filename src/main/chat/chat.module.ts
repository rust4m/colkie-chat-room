import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { UserModule } from '../user/user.module';
import { UserGroupModule } from '../user-group/user-group.module';
import { ChatService } from './chat.service';
import { MessageModule } from '../message/message.module';
import { GroupModule } from '../group/group.module';
import { MessageRecipientModule } from '../message-recipient/message-recipient.module';

@Module({
    imports: [UserModule, UserGroupModule, MessageModule, GroupModule, MessageRecipientModule],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule {}
