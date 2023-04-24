import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CommonExceptionFilter } from './error/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.useLogger(logger);

    app.setGlobalPrefix('api', { exclude: ['/health'] });

    app.useGlobalFilters(new CommonExceptionFilter());

    app.use(bodyParser.json({ limit: '2mb' }));
    app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

    const port = process.env.PORT || 3000;
    await app.listen(port);

    logger.log('App is running on port: ' + port);
}

bootstrap();
