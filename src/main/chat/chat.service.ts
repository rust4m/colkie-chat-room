import { Injectable } from '@nestjs/common';
import { Group } from '../group/domain/group.entity';
import { GroupService } from '../group/group.service';
import { Message } from '../message/domain/message.entity';
import { MessageService } from '../message/message.service';
import { UserGroup } from '../user-group/domain/user-group.entity';
import { UserGroupService } from '../user-group/user-group.service';
import { User } from '../user/domain/user.entity';
import { UserService } from '../user/user.service';
import { MessageRequestDto } from './dto/request/message.request.dto';
import { UserRequestDto } from './dto/request/user.request.dto';
import { MessageRecipientService } from '../message-recipient/message-recipient.service';

@Injectable()
export class ChatService {
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService,
        private readonly userGroupService: UserGroupService,
        private readonly groupService: GroupService,
        private readonly messageRecipientService: MessageRecipientService,
    ) {}

    async createUserWithGroups(user: UserRequestDto & User): Promise<User> {
        try {
            const groups = [] as Group[];

            for (let idx = 0; idx < user.groupIds.length; idx++) {
                const group = new Group();
                group.id = user.groupIds[idx];

                groups.push(group);
            }

            user.groups = groups;

            return await this.userService.create(user);
        } catch (error) {
            throw error;
        }
    }

    async createUserGroup(userGroup: UserGroup): Promise<UserGroup> {
        try {
            return await this.userGroupService.create(userGroup);
        } catch (error) {
            throw error;
        }
    }

    async createGroup(group: Group): Promise<Group> {
        try {
            return await this.groupService.create(group);
        } catch (error) {
            throw error;
        }
    }

    async createMessage(message: MessageRequestDto & Message): Promise<Message> {
        try {
            let prevMessageId = null;

            const user = await this.userService.findById(message.userId);
            const userMessage = await this.messageService.findByUserId(message.userId);
            const userGroups = await this.userGroupService.findByUserId(user.id);

            if (!!userMessage) {
                prevMessageId = userMessage.id;
            }

            return await this.messageService.create({
                ...message,
                prevMessageId,
                user,
                userGroups,
            });
        } catch (error) {
            throw error;
        }
    }

    async findGroupMessages(id: string): Promise<any> {
        try {
            const userGroups = await this.userGroupService.findByGroupId(id);
            const messages = [] as Message[];

            for (let idx = 0; idx < userGroups.length; idx++) {
                const userGroup = userGroups[idx];

                const messageRecipients = await this.messageRecipientService.findByUserGroupId(
                    userGroup.id,
                );

                for (let idxx = 0; idxx < messageRecipients.length; idxx++) {
                    const recipient = messageRecipients[idxx];

                    const message: Message = await this.messageService.findById(
                        Number(recipient.messageId),
                    );

                    messages.push(message);
                }
            }

            return messages;
        } catch (error) {
            throw error;
        }
    }
}
