import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
    readonly code: string;

    constructor(code: string, message: string) {
        super(message, HttpStatus.BAD_REQUEST);
        this.code = code;
    }

    static of(code: string, message: string): ServiceException {
        return new ServiceException(code, message);
    }
}
