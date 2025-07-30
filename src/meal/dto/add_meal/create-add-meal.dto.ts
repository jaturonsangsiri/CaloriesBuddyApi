import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateAddMealDto {
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  mealId: string;

  @IsOptional()
  @IsString()
  foodId: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
