import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/main/user/domain/user.entity';

export class MessageRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly content: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    readonly subject: string;

    @IsString()
    @IsNotEmpty()
    readonly userId: string;
}
