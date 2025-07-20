import { IsOptional } from 'class-validator';

export class CreateFoodFavDto {
    @IsOptional()
    userId: string;

    @IsOptional()
    foodId: string;

    @IsOptional()
    createdAt: Date;
}
