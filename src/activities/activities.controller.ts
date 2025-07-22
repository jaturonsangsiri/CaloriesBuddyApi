import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateActivitiesDto } from './dto/create-activities.dto';
import { UpdateActivitiesDto } from './dto/update-activities.dto';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) { }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.activitiesService.findAll(id);
  }

  @Post()
  create(@Body() createActivitiesDto: CreateActivitiesDto) {
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
