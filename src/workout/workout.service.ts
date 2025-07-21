import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './workout/create-workout.dto';
import { UpdateWorkoutDto } from './workout/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.workout.findMany({ orderBy: [{ createdAt: "desc" }] });
  }

  async create(createWorkoutDto: CreateWorkoutDto) {
    await this.prisma.workout.create({ data: createWorkoutDto });
    return { message: 'Added workout successfull!' };
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    await this.prisma.workout.update({ where: { id }, data: updateWorkoutDto });
    return { message: 'Updated workout successfull!' };
  }

  async delete(id: string) {
    await this.prisma.workout.delete({ where: { id } });
    return { message: 'Delete successful!' };
  }
}
