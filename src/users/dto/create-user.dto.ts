import { IsString, IsNumber, IsOptional, IsEmail, IsBoolean, MaxLength} from 'class-validator';
import { activityLevel, ExerciseGoal, Gender, Roles } from 'generated/prisma';

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
    role: Roles;
    
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
