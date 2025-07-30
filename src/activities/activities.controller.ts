import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { CreateActivitiesDto } from './dto/create-activities.dto';
import { UpdateActivitiesDto } from './dto/update-activities.dto';
import { ActivitiesService } from './activities.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('activities')
@UseGuards(AuthGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Get(':id')
  findAll(@Param('id') id: string, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.activitiesService.findAll(id);
  }

  @Post()
  create(@Body() createActivitiesDto: CreateActivitiesDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== createActivitiesDto.userId) {
      throw new ForbiddenException('Invalid user');
    }
    return this.activitiesService.create(createActivitiesDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivitiesDto: UpdateActivitiesDto) {
    return this.activitiesService.update(id, updateActivitiesDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.activitiesService.delete(id);
  }
}
