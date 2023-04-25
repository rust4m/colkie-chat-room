import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GroupRequestDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name: string;
}
