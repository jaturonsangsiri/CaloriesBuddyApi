import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CreateWorkoutFavDto } from './dto/workout_favorite/create-workout-fav.dto';
import { UpdateWorkoutFavDto } from './dto/workout_favorite/update-workout-fav.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/contants/roles.decorator';
import { Role } from 'src/contants/roles.enum';

@Controller('workout')
@UseGuards(AuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) { }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get('workoutFav/:id')
  workoutFav(@Param('id') id: string, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.workoutService.workoutFav(id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Post('workoutFav')
  createWorkoutFav(@Body() createWorkoutFavDto: CreateWorkoutFavDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== createWorkoutFavDto.userId) {
      throw new ForbiddenException('Invalid user');
    }
    return this.workoutService.createWorkoutFav(createWorkoutFavDto);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Patch('workoutFav/:id')
  updateWorkoutFav(@Param('id') id: string, @Body() updateWorkoutFavDto: UpdateWorkoutFavDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== updateWorkoutFavDto.userId) {
      throw new ForbiddenException('Invalid user');
    }
    return this.workoutService.updateWorkoutFav(id, updateWorkoutFavDto);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workoutService.delete(id);
  }

  @Delete('workoutFav/:id')
  deleteWorkoutFav(@Param('id') id: string, @Body() createWorkoutFavDto: CreateWorkoutFavDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== createWorkoutFavDto.userId) { 
      throw new ForbiddenException('Invalid user');
    }
    return this.workoutService.deleteWorkoutFav(id);
  }
}
