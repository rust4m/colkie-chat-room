import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ServiceException } from './service.exception';

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
    private readonly logger: Logger = new Logger(CommonExceptionFilter.name);

    async catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let errorMessage: string;
        let errorCode: string;
        let errors: string[];
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        let logDebug: boolean = false;

        if (exception instanceof ServiceException) {
            const serviceException = exception as ServiceException;
            errorCode = serviceException.code;
            errorMessage = serviceException.message;
        } else if (exception instanceof BadRequestException) {
            const exceptionData = exception.getResponse();
            errors = exceptionData['message'] ?? [];
            errorCode = 'BAD_REQUEST';
            errorMessage = 'Bad Request';
        } else if (exception instanceof UnauthorizedException) {
            errorCode = 'UNAUTHORIZED';
            errorMessage = exception.message ?? 'Not Authenticated';
        } else if (exception instanceof NotFoundException) {
            errorCode = 'NOT_FOUND';
            errorMessage = exception.message;
            logDebug = true;
        } else if (exception instanceof ThrottlerException) {
            errorCode = 'TOO_MANY_REQUEST';
            errorMessage = exception.message;
            logDebug = true;
        } else if (exception instanceof ForbiddenException) {
            errorCode = 'FORBIDDEN_RESOURCE';
            errorMessage = exception.message;
            logDebug = true;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorCode = 'INTERNAL_SERVER_ERROR';
            errorMessage = 'Oops, Something went wrong!!';
        }

        const uuid: string = uuidv4();
        const logMessage = `Error, uuid: ${uuid}, url: ${request.url}, method: ${request.method}, code: ${errorCode}, message: ${exception.message}`;
        logDebug ? this.logger.debug(logMessage) : this.logger.error(logMessage);

        const errorResponse = {
            uuid: uuid,
            timestamp: moment().format(),
            status: status,
            path: request.url,
            method: request.method,
            code: errorCode,
            message: errorMessage,
            errors: errors,
        };

        return response.status(status).send(errorResponse);
    }
}
