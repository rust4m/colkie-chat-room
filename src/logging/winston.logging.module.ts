import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as contextService from 'request-context';
import { format, transports } from 'winston';

const logPlainFormat = format.printf(({ timestamp, reqId, ms, level, message }) => {
    return `${timestamp} ${level} - ${reqId ? reqId : ''}, ${ms}, ${message}`;
});

const addContexttualData = format(logEntry => {
    const reqId = contextService.get('reqId');
    if (reqId) {
        logEntry.reqId = reqId;
    }
    return logEntry;
});

@Module({
    imports: [
        WinstonModule.forRoot({
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss SSS' }),
                format.ms(),
                addContexttualData(),
                process.env.DEPLOY_ENV == 'prod'
                    ? format.uncolorize()
                    : format.colorize({ all: true }),
                process.env.DEPLOY_ENV == 'prod' ? format.json() : logPlainFormat,
            ),
            transports: [new transports.Console()],
        }),
    ],
})
export class WinstonLoggingModule {}
