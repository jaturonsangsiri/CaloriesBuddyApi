import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/contants/roles.decorator';
import { Role } from 'src/contants/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  findAll(@Query("filter") filter: string) {
    return this.usersService.findAll(filter);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() user: UpdatedUserDto) {
    return this.usersService.login(user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdatedUserDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.usersService.delete(id);
  }
}