import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddMealDto } from './dto/add_meal/create-add-meal.dto';
import { CreateMealDto } from './dto/meal/create-meal.dto';
import { UpdateMealDto } from './dto/meal/update-meal.dto';

@Injectable()
export class MealService {
  constructor(private readonly prisma: PrismaService) { }

  async getMeal(id: string, filter: string) {
    let search = {};
    if (filter) {
      search = {
        OR: [{ name: { contains: filter } }]
      }
    }
    return await this.prisma.meal.findMany({
      include: {mealItems: {include: {food: true}}},
      where: { userId: id },
      orderBy: [{ createdAt: "desc" }]
    });
  }

  async getMealItem(id: string) {
    return await this.prisma.mealItem.findMany({
      include: {food: true},
      where: {mealId: id},
      orderBy: [{createdAt: "desc"}]
    })
  }

  async Meal(createMealDto: CreateMealDto) {
    await this.prisma.meal.create({ data: createMealDto });
    return { message: 'Added meal successfull!' };
  }

  async addMeal(createAddMealDto: CreateAddMealDto) {
    await this.prisma.mealItem.create({data: createAddMealDto});
    return {message: 'Added meal food successful!'};
  }

  async addMealItem(createAddMealDto: CreateAddMealDto) {
    await this.prisma.mealItem.create({data: createAddMealDto});
    return {message: 'Added meal item successful!'};
  }

  async updateMeal(id: string, updateMealDto: UpdateMealDto) {
    await this.prisma.meal.update({ where: { id }, data: updateMealDto });
    return { message: 'Updated meal successfull!' };
  }

  async updateMealItem(id: string, createAddMealDto: CreateAddMealDto) {
    await this.prisma.mealItem.update({where: {id}, data: createAddMealDto});
    return {message: 'Updated meal item successful!'};
  }

  async deleteMeal(id: string) {
    await this.prisma.meal.delete({ where: { id } });
    return { message: 'Delete successful!' };
  }

  async deleteMealItem(id: string) {
    await this.prisma.mealItem.delete({where: {id}});
    return { message: 'Delete successful!' };
  }
}
