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
import { GroupService } from './group.service';
import { GroupRequestDto } from './dto/request/group.request.dto';

@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService,
        private readonly configService: ConfigService,
    ) {}

    @Post('/create')
    @HttpCode(200)
    async create(@Body() groupRequestBody: GroupRequestDto, @Res() res: Response) {
        try {
            const result = await this.groupService.create(groupRequestBody);
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
            const result = await this.groupService.findById(id);
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
