import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivitiesDto } from './dto/create-activities.dto';
import { UpdateActivitiesDto } from './dto/update-activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(id: string) {
    return await this.prisma.activities.findMany({ include: { workout: true }, where: {userId: id}, orderBy: [{ createdAt: "desc" }] });
  }

  async create(createActivitiesDto: CreateActivitiesDto) {
    await this.prisma.activities.create({ data: createActivitiesDto });
    return { message: 'Added activity successfull!' };
  }

  async update(id: string, updateActivitiesDto: UpdateActivitiesDto) {
    await this.prisma.activities.update({ where: { id }, data: updateActivitiesDto });
    return { message: 'Updated activity successfull!' };
  }

  async delete(id: string) {
    await this.prisma.activities.delete({ where: { id } });
    return { message: 'Delete successful!' };
  }
}
