import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/food/create-food.dto';
import { UpdateFoodDto } from './dto/food/update-food.dto';
import { CreateFoodFavDto } from './dto/food_fav/create-food-fav.dto';
import { UpdateFoodFavDto } from './dto/food_fav/update-food-fav.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.foodsService.findAll(filter);
  }

  @Post() 
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get('foodFav/:id')
  foodFav(@Param('id') id: string) {
    return this.foodsService.foodFav(id);
  } 

  @Post('foodFav')
  createFoodFav(@Body() createFoodFavDto: CreateFoodFavDto) {
    return this.foodsService.createFoodFav(createFoodFavDto);
  }

  @Patch('foodFav/:id')
  updateFoodFav(@Param('id') id: string, @Body() updateFoodFavDto: UpdateFoodFavDto) {
    return this.foodsService.updateFoodFav(id, updateFoodFavDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.foodsService.delete(id);
  }

  @Delete('foodFav/:id')
  deleteFoodFav(@Param('id') id: string) {
    return this.foodsService.deleteFoodFav(id);
  }
}
