import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly fullName: string;

    @IsArray()
    @IsNotEmpty()
    readonly groupIds: string[];
}
