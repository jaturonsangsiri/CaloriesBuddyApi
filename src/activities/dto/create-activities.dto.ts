import { IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateActivitiesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  workoutId: string;

  @IsOptional()
  @IsNumber()
  sets: number;

  @IsOptional()
  @IsNumber()
  reps: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
