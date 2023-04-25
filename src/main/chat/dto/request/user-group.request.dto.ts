import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserGroupRequestDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    readonly groupId: string;
}
