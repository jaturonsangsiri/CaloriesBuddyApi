import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, MaxLength } from 'class-validator';
import { FoodCategory } from 'generated/prisma';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsNumber()
  calories: number;

  @IsOptional()
  @IsNumber()
  carb: number;

  @IsOptional()
  @IsNumber()
  protein: number;

  @IsOptional()
  @IsNumber()
  fat: number;

  @IsOptional()
  @IsString()
  foodCategory: FoodCategory;

  @IsOptional()
  image: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  updatedBy: string;
}
