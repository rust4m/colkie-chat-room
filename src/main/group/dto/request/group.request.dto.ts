import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GroupRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name: string;
}
