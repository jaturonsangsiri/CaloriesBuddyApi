import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Module({
  providers: [WorkoutService]
})
export class WorkoutModule {}
