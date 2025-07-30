import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, UseGuards, Request } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/meal/create-meal.dto';
import { UpdateMealDto } from './dto/meal/update-meal.dto';
import { CreateAddMealDto } from './dto/add_meal/create-add-meal.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('meal')
@UseGuards(AuthGuard)
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get(':id')
  getMeal(@Param('id') id: string, @Query('filter') filter: string, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.mealService.getMeal(id, filter);
  }

  @Get('mealItem/:id')
  getMealItem(@Param('id') id: string) {
    return this.mealService.getMealItem(id);
  }

  @Post()
  Meal(@Body() CreateMealDto: CreateMealDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== CreateMealDto.userId) {
      throw new ForbiddenException('Invalid user');
    }
    return this.mealService.Meal(CreateMealDto);
  }
  
  @Post('mealItem')
  addMealItem(@Body() createAddMealDto: CreateAddMealDto) {
    return this.mealService.addMealItem(createAddMealDto)
  }

  @Post('mealItem') 
  addMeal(@Body() createAddMealDto: CreateAddMealDto) {
    return this.mealService.addMeal(createAddMealDto);
  }

  @Patch(':id')
  updateMeal(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.updateMeal(id, updateMealDto);
  }

  @Patch('mealItem/:id') 
  updateAddMeal(@Param('id') id: string, @Body() createAddMealDto: CreateAddMealDto) {
    return this.mealService.updateMealItem(id, createAddMealDto);
  }

  @Delete(':id')
  deleteMeal(@Param('id') id: string) {
    return this.mealService.deleteMeal(id);
  }

  @Delete('mealItem/:id')
  deleteMealItem(@Param('id') id: string) {
    return this.mealService.deleteMealItem(id);
  }
}
