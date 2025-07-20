import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MealType } from 'generated/prisma';

export class CreateEatFoodDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    foodId: string;

    @IsOptional()
    mealType: MealType;

    @IsOptional()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsString()
    notes: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
