import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { MealType } from 'generated/prisma';

export class CreateMealDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsOptional()
    type: MealType;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
