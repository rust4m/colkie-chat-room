import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageRequestDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly content: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly subject: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}
