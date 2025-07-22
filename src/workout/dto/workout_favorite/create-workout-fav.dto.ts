import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateWorkoutFavDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    userId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    workoutId: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
