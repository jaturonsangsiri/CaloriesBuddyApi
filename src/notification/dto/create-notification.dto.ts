import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NotificationType } from 'generated/prisma';

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    message: string;

    @IsNotEmpty()
    type: NotificationType;
}