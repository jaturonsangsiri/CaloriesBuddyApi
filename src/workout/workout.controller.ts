import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './workout/create-workout.dto';
import { UpdateWorkoutDto } from './workout/update-workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) { }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workoutService.delete(id);
  }
}
