import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEatFoodDto } from './dto/eat_food/create-eat-food.dto';
import { CreateFoodDto } from './dto/food/create-food.dto';
import { UpdateFoodDto } from './dto/food/update-food.dto';
import { CreateFoodFavDto } from './dto/food_fav/create-food-fav.dto';
import { UpdateFoodFavDto } from './dto/food_fav/update-food-fav.dto';

const filterUser = {
  select: {name: true, email: true, gender: true, age: true, height: true, weight: true, profileImg: true, activityLevel: true, goal: true, tdee: true, isActive: true}
};

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

  async foodFav(id: string) {
    return await this.prisma.userFavFoods.findMany({
      include: {
        food: true, 
        user: filterUser
      },
      where: {userId: id},
      orderBy: [{ createdAt: "desc" }]
    });
  }

  async getEatFood(id: string, filter: string) {
    let search = {};
    if (filter) {
      search = {
        OR: [{ name: { contains: filter } }]
      }
    }
    return await this.prisma.foodEaten.findMany({
      include: {
        food: true, 
        user: filterUser
      },
      where: { userId: id },
      orderBy: [{ createdAt: "desc" }]
    });
  }

  async create(createFoodDto: CreateFoodDto) {
    await this.prisma.foods.create({ data: createFoodDto });
    return { message: 'Added food successfull!' };
  }

  async createFoodFav(createFoodFavDto: CreateFoodFavDto) {
    const data = await this.prisma.userFavFoods.findFirst({where: {foodId: createFoodFavDto.foodId}});
    if (data) {
      return new ConflictException();
    } 
    await this.prisma.userFavFoods.create({data: createFoodFavDto});
    return { message: 'Added food favorite successfull!' };
  }

  async eatFood(createEatFoodDto: CreateEatFoodDto) {
    await this.prisma.foodEaten.create({data: createEatFoodDto});
    return { message: 'Added food successfull!' };
  }

  async findOne(id: string) {
    const result = await this.prisma.foods.findUnique({where: { id }});
    return result;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    await this.prisma.foods.update({where: { id }, data: updateFoodDto});
    return { message: 'Updated food successfull!' };
  }

  async updateEatFood(id: string, updateFoodDto: UpdateFoodDto) {
    await this.prisma.foodEaten.update({where: { id }, data: updateFoodDto});
    return { message: 'Updated food successfull!' };
  }

  async updateFoodFav(id: string, updateFoodFavDto: UpdateFoodFavDto) {
    await this.prisma.userFavFoods.update({where: {id}, data: updateFoodFavDto});
    return {message: 'Update food favorite successful!'};
  }

  async delete(id: string) {
    await this.prisma.foods.delete({where: {id}});
    return { message: 'Delete successful!' };
  }

  async deleteEatFood(id: string) {
    await this.prisma.foodEaten.delete({where: {id}});
    return {message: 'Delete successful!'};
  }

  async deleteFoodFav(id: string) {
    await this.prisma.userFavFoods.delete({where: {id}});
    return {message: 'Delete successful!'};
  }
}
