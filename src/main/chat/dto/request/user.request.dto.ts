import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserRequestDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly fullName: string;

    @ApiProperty({ required: true })
    @IsArray()
    @IsNotEmpty()
    readonly groupIds: string[];
}
