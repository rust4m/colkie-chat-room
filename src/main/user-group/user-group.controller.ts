import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserGroupService } from './user-group.service';
import { UserGroupRequestDto } from './dto/request/user-group.request.dto';

@Controller('user-group')
export class UserGroupController {
    constructor(private readonly userGroupService: UserGroupService) {}

    @Post('/create')
    @HttpCode(200)
    async create(@Body() groupRequestBody: UserGroupRequestDto, @Res() res: Response) {
        try {
            const result = await this.userGroupService.create(groupRequestBody);
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
            const result = await this.userGroupService.findById(id);
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
