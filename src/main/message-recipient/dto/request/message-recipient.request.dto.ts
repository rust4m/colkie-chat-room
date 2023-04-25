import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/main/user/domain/user.entity';

export class MessageRecipientRequestDto {
    @IsString()
    @IsNotEmpty()
    readonly userGroupId: string;

    @IsString()
    @IsNotEmpty()
    readonly messageId: string;
}
