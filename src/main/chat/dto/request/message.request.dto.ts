import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly content: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly subject: string;

    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}
