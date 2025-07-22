import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CreateWorkoutFavDto } from './dto/workout_favorite/create-workout-fav.dto';
import { UpdateWorkoutFavDto } from './dto/workout_favorite/update-workout-fav.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) { }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get('workoutFav/:id')
  workoutFav(@Param('id') id: string) {
    return this.workoutService.workoutFav(id);
  }

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Post('workoutFav')
  createWorkoutFav(@Body() createWorkoutFavDto: CreateWorkoutFavDto) {
    return this.workoutService.createWorkoutFav(createWorkoutFavDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Patch('workoutFav/:id')
  updateWorkoutFav(@Param('id') id: string, @Body() updateWorkoutFavDto: UpdateWorkoutFavDto) {
    return this.workoutService.updateWorkoutFav(id, updateWorkoutFavDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workoutService.delete(id);
  }

  @Delete('workoutFav/:id')
  deleteWorkoutFav(@Param('id') id: string) {
    return this.workoutService.deleteWorkoutFav(id);
  }
}
