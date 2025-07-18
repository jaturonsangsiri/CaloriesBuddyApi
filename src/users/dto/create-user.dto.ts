import { IsString, IsNumber, IsOptional, IsEmail, IsDate, IsBoolean, MaxLength} from 'class-validator';
import { activityLevel, ExerciseGoal, Gender } from 'generated/prisma';

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(150)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    accName: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    password: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(150)
    email: string;

    @IsOptional()
    @IsString()
    gender: Gender;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsNumber()
    height: number;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsString()
    profileImg: string;

    @IsOptional()
    activityLevel: activityLevel;

    @IsOptional()
    @IsString()
    goal: ExerciseGoal;

    @IsOptional()
    @IsNumber()
    tdee: number;
    
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
}
