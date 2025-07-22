import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CreateWorkoutFavDto } from './dto/workout_favorite/create-workout-fav.dto';
import { UpdateWorkoutFavDto } from './dto/workout_favorite/update-workout-fav.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.workout.findMany({ orderBy: [{ createdAt: "desc" }] });
  }

  async workoutFav(id: string) {
    return await this.prisma.favWorkout.findMany({
      include: {workout: true},
      where: {userId: id},
      orderBy: [{ createdAt: "desc" }]
    });
  }

  async create(createWorkoutDto: CreateWorkoutDto) {
    await this.prisma.workout.create({ data: createWorkoutDto });
    return { message: 'Added workout successfull!' };
  }

  async createWorkoutFav(createWorkoutFavDto: CreateWorkoutFavDto) {
    const data = await this.prisma.favWorkout.create({data: createWorkoutFavDto});
    if (data) {
      return new ConflictException('Workout already favorited');
    }
    return {message: 'Added workout favorite successfull!'};
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    await this.prisma.workout.update({ where: { id }, data: updateWorkoutDto });
    return { message: 'Updated workout successfull!' };
  }

  async updateWorkoutFav(id: string, updateWorkoutFavDto: UpdateWorkoutFavDto) {
    await this.prisma.favWorkout.update({where: {id}, data: updateWorkoutFavDto});
    return {message: 'Updated workout favorite successful!'};
  }

  async delete(id: string) {
    await this.prisma.workout.delete({ where: { id } });
    return { message: 'Delete successful!' };
  }

  async deleteWorkoutFav(id: string) {
    await this.prisma.favWorkout.delete({where: {id}});
    return {message: 'Delete workout favorite successful!'};
  }
}
