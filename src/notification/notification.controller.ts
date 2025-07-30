import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/contants/roles.decorator';
import { Role } from 'src/contants/roles.enum';

@Controller('notification')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get(':id')
  findAll(@Param('id') id: string, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== id) {
      throw new ForbiddenException('Invalid user');
    }
    return this.notificationService.findAll(id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() createNotificationDto: CreateNotificationDto, @Request() req: any) {
    const currentUser = req.user;
    // Check id from token is equal to id param
    if (currentUser.userId !== createNotificationDto.userId) {
      throw new ForbiddenException('Invalid user');
    }
    return this.notificationService.create(createNotificationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }
}
