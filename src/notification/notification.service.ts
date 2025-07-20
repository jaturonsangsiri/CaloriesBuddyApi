import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(id: string) {
    return await this.prisma.notification.findMany({ 
      where: {userId: id}, 
      orderBy: [{ createdAt: "desc" }] 
    });
  }

  async create(createNotificationDto: CreateNotificationDto) {
    await this.prisma.notification.create({ data: createNotificationDto });
    return { message: 'Added notification successfull!' };
  }

  async delete(id: string) {
    await this.prisma.notification.delete({where: {id}});
    return { message: 'Delete successful!' };
  }
}
