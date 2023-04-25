import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import { GroupModule } from 'src/main/group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/main/group/domain/group.entity';
import { MessageRecipient } from 'src/main/message-recipient/domain/message-recipient.entity';
import { Message } from 'src/main/message/domain/message.entity';
import { UserGroup } from 'src/main/user-group/domain/user-group.entity';
import { User } from 'src/main/user/domain/user.entity';
import { CreateGroupTable } from 'src/migrations/group.migration';
import { MessageRecipientTable } from 'src/migrations/message-recipient.migration';
import { CreateMessageTable } from 'src/migrations/message.migration';
import { CreateUserGroupTable } from 'src/migrations/user-group.migration';
import { CreateUserTable } from 'src/migrations/user.migration';
import { Repository } from 'typeorm';

export let app: INestApplication;
let groupRepository: Repository<Group>;
let userGroupRepository: Repository<UserGroup>;
let messageRepository: Repository<Message>;
let messageRecipientRepository: Repository<MessageRecipient>;
let userRepository: Repository<User>;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration],
            }),
            AppModule,
            GroupModule,
            TypeOrmModule.forRootAsync({
                useFactory: (configService: ConfigService) => ({
                    type: 'postgres',
                    host: configService.get<string>('dbHost'),
                    port: +configService.get<number>('port'),
                    username: configService.get<string>('dbUser'),
                    password: configService.get<string>('dbPassword'),
                    database: configService.get<string>('db'),
                    entities: [User, Group, Message, UserGroup, MessageRecipient],
                    migrations: [
                        CreateUserTable,
                        CreateGroupTable,
                        CreateMessageTable,
                        CreateUserGroupTable,
                        MessageRecipientTable,
                    ],
                    migrationsRun: true,
                    retryAttempts: 3,
                    logging: true,
                }),
                inject: [ConfigService],
            }),
        ],
    }).compile();

    app = moduleFixture.createNestApplication();
    groupRepository = moduleFixture.get('GroupRepository');
    userRepository = moduleFixture.get('UserRepository');
    userGroupRepository = moduleFixture.get('UserGroupRepository');
    messageRepository = moduleFixture.get('MessageRepository');
    messageRecipientRepository = moduleFixture.get('MessageRecipientRepository');

    await app.init();
});

afterAll(async () => {
    await messageRecipientRepository.query(`DELETE FROM "message_recipient";`);
    await userGroupRepository.query(`DELETE FROM "user_group";`);
    await messageRepository.query(`DELETE FROM "message";`);
    await groupRepository.query(`DELETE FROM "group";`);
    await userRepository.query(`DELETE FROM "user";`);

    await app.close();
});
