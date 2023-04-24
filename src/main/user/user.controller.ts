import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/request/user.request.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    @Post('/create')
    @HttpCode(200)
    async create(@Body() userRequestBody: UserRequestDto, @Res() res: Response) {
        try {
            const result = await this.userService.create(userRequestBody);
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
            const result = await this.userService.findById(id);
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
