import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CreateWorkoutFavDto } from './dto/workout_favorite/create-workout-fav.dto';
import { UpdateWorkoutFavDto } from './dto/workout_favorite/update-workout-fav.dto';
import { MuscleType } from 'generated/prisma';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(filter: string) {
    const MUSCLE_MAPPING = { 'อก': MuscleType.CHEST, 'ไหล่': MuscleType.SHOULDER, 'ขา': MuscleType.LEG, 'หลังแขน': MuscleType.TRICEP, 'หน้าแขน': MuscleType.BICEP, 'หน้าท้อง': MuscleType.SIXPACK, 'ท่อนแขน': MuscleType.FOREARM, 'หลัง': MuscleType.BACK, 'น่อง': MuscleType.CALF };
    const searchCondition = filter ? { name: { contains: filter } } : {};

    // ดึงข้อมูลจากฐานข้อมูล
    const data = await this.prisma.workout.findMany({ where: searchCondition, orderBy: [{ createdAt: "desc" }] });
    // จัดกลุ่มข้อมูลโดยใช้ reduce (มีประสิทธิภาพกว่า)
    const result = Object.keys(MUSCLE_MAPPING).reduce((acc, thaiName) => {
      const muscleType = MUSCLE_MAPPING[thaiName];
      acc[thaiName] = data.filter(item => item.muscle === muscleType);
      return acc;
    }, {} as Record<string, typeof data>);
    return { success: true, message: 'get workout success!', data: result };
  }

  async workoutFav(id: string) {
    return await this.prisma.favWorkout.findMany({
      include: { workout: true },
      where: { userId: id },
      orderBy: [{ createdAt: "desc" }]
    });
  }

  async create(createWorkoutDto: CreateWorkoutDto) {
    await this.prisma.workout.create({ data: createWorkoutDto });
    return { message: 'Added workout successfull!' };
  }

  async createWorkoutFav(createWorkoutFavDto: CreateWorkoutFavDto) {
    const data = await this.prisma.favWorkout.create({ data: createWorkoutFavDto });
    if (data) {
      return new ConflictException('Workout already favorited');
    }
    return { message: 'Added workout favorite successfull!' };
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    await this.prisma.workout.update({ where: { id }, data: updateWorkoutDto });
    return { message: 'Updated workout successfull!' };
  }

  async updateWorkoutFav(id: string, updateWorkoutFavDto: UpdateWorkoutFavDto) {
    await this.prisma.favWorkout.update({ where: { id }, data: updateWorkoutFavDto });
    return { message: 'Updated workout favorite successful!' };
  }

  async delete(id: string) {
    await this.prisma.workout.delete({ where: { id } });
    return { message: 'Delete successful!' };
  }

  async deleteWorkoutFav(id: string) {
    await this.prisma.favWorkout.delete({ where: { id } });
    return { message: 'Delete workout favorite successful!' };
  }
}
