import { IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { MuscleType, WorkoutDifficulty, WorkoutEquipment } from 'generated/prisma';

export class CreateWorkoutDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    detail: string;

    @IsOptional()
    muscle: MuscleType;

    @IsOptional()
    @IsNumber()
    calorieBurn: number;

    @IsOptional()
    difficulty: WorkoutDifficulty;

    @IsOptional()
    equipments: WorkoutEquipment;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    video: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
