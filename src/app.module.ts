import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { WinstonLoggingModule } from './logging/winston.logging.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalModule } from './global/global.module';

@Module({
    imports: [
        HealthModule,
        WinstonLoggingModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        GlobalModule,
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule {}
