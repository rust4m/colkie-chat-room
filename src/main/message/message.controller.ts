import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { MessageService } from './message.service';
import { MessageRequestDto } from './dto/request/message.request.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post('/create')
    @HttpCode(200)
    async create(@Body() messageRequestBody: MessageRequestDto, @Res() res: Response) {
        try {
            const result = await this.messageService.create(messageRequestBody);
            return res.json({
                statusCode: res.statusCode,
                timeStamp: new Date().toUTCString(),
                data: result,
            });
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @HttpCode(200)
    async findById(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.messageService.findById(Number(id));
            return res.json({
                statusCode: res.statusCode,
                timeStamp: new Date().toUTCString(),
                data: result,
            });
        } catch (error) {
            throw error;
        }
    }
}
