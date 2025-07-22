import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateAddMealDto {
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsString()
    note?: string;

    @IsString()
    @IsNotEmpty()
    mealId: string;

    @IsString()
    @IsNotEmpty()
    foodId: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
