import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ForbiddenException, Request } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/food/create-food.dto';
import { UpdateFoodDto } from './dto/food/update-food.dto';
import { CreateFoodFavDto } from './dto/food_fav/create-food-fav.dto';
import { UpdateFoodFavDto } from './dto/food_fav/update-food-fav.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Role } from 'src/contants/roles.enum';
import { Roles } from 'src/contants/roles.decorator';

@Controller('foods')
@UseGuards(AuthGuard)
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.foodsService.findAll(filter);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post() 
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get('foodFav/:id')
  foodFav(@Param('id') id: string) {
    return this.foodsService.foodFav(id);
  } 

  @Post('foodFav')
  createFoodFav(@Body() createFoodFavDto: CreateFoodFavDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== createFoodFavDto.userId) {
      throw new ForbiddenException('Invalid user');
    }
    return this.foodsService.createFoodFav(createFoodFavDto);
  }

  @Patch('foodFav/:id')
  updateFoodFav(@Param('id') id: string, @Body() updateFoodFavDto: UpdateFoodFavDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.foodsService.updateFoodFav(updateFoodFavDto.foodFavId, updateFoodFavDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.foodsService.delete(id);
  }

  @Delete('foodFav/:id')
  deleteFoodFav(@Param('id') id: string) {
    return this.foodsService.deleteFoodFav(id);
  }
}
