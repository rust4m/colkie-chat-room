import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { WinstonLoggingModule } from './logging/winston.logging.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalModule } from './global/global.module';
import { UserModule } from './main/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './main/user/domain/user.entity';
import { CreateUserTable } from './migrations/user.migration';
import { GroupModule } from './main/group/group.module';
import { MessageModule } from './main/message/message.module';
import { Group } from './main/group/domain/group.entity';
import { Message } from './main/message/domain/message.entity';
import { CreateGroupTable } from './migrations/group.migration';
import { CreateMessageTable } from './migrations/message.migration';
import { UserGroup } from './main/user-group/domain/user-group.entity';
import { UserGroupModule } from './main/user-group/user-group.module';
import { CreateUserGroupTable } from './migrations/user-group.migration';
import { MessageRecipient } from './main/message-recipient/domain/message-recipient.entity';
import { MessageRecipientTable } from './migrations/message-recipient.migration';
import { ChatModule } from './main/chat/chat.module';

@Module({
    imports: [
        HealthModule,
        WinstonLoggingModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        GlobalModule,
        UserModule,
        MessageModule,
        GroupModule,
        UserGroupModule,
        ChatModule,
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
                // autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule {}
