import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @IsString()
    @IsNotEmpty()
    readonly groupId: string;
}
