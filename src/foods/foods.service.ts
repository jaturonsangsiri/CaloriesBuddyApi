import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: string) {
    let search = {};
    if (filter) {
      search = {
        OR: [
          { name: { contains: filter } }
        ]}
    }
    return await this.prisma.foods.findMany({
      where: search,
      orderBy: [{ createdAt: "desc" }]
    });
  }

  async create(createFoodDto: CreateFoodDto) {
    await this.prisma.foods.create({ data: createFoodDto });
    return { message: 'Added food successfull!' };
  }

  async findOne(id: string) {
    const result = await this.prisma.foods.findUnique({where: { id }});
    return result;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    await this.prisma.foods.update({where: { id }, data: updateFoodDto});
  }

  async delete(id: string) {
    await this.prisma.foods.delete({where: {id}});
    return { message: 'Delete successful!' };
  }
}
