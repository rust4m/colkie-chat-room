import { IsNotEmpty, IsString } from 'class-validator';

export class UserResponseDto {
    fullName: string;

    id: string;

    createdAt: Date;
}
