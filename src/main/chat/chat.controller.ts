import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';
import { GroupRequestDto } from './dto/request/group.request.dto';
import { MessageRequestDto } from './dto/request/message.request.dto';
import { UserGroupRequestDto } from './dto/request/user-group.request.dto';
import { UserRequestDto } from './dto/request/user.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @ApiOperation({ summary: 'Creates user with groups' })
    @Post('/user/create')
    @HttpCode(200)
    async createUserWithGroups(@Body() userRequestBody: UserRequestDto, @Res() res: Response) {
        try {
            const result = await this.chatService.createUserWithGroups(userRequestBody);
            return res.json({
                statusCode: res.statusCode,
                timeStamp: new Date().toUTCString(),
                data: result,
            });
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Creates user-group' })
    @Post('/user-group/create')
    @HttpCode(200)
    async createUserGroup(@Body() groupRequestBody: UserGroupRequestDto, @Res() res: Response) {
        try {
            const result = await this.chatService.createUserGroup(groupRequestBody);
            return res.json({
                statusCode: res.statusCode,
                timeStamp: new Date().toUTCString(),
                data: result,
            });
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Creates group' })
    @Post('group/create')
    @HttpCode(200)
    async createGroup(@Body() groupRequestBody: GroupRequestDto, @Res() res: Response) {
        try {
            const result = await this.chatService.createGroup(groupRequestBody);
            return res.json({
                statusCode: res.statusCode,
                timeStamp: new Date().toUTCString(),
                data: result,
            });
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Creates message' })
    @Post('/message/create')
    @HttpCode(200)
    async create(@Body() messageRequestBody: MessageRequestDto, @Res() res: Response) {
        try {
            const result = await this.chatService.createMessage(messageRequestBody);
            return res.json({
                statusCode: res.statusCode,
                timeStamp: new Date().toUTCString(),
                data: result,
            });
        } catch (error) {
            throw error;
        }
    }

    @ApiOperation({ summary: 'Gets group messages' })
    @Get('/group/:id/messages')
    @HttpCode(200)
    async findGroupMessages(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.chatService.findGroupMessages(id);
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
