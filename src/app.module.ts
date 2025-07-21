import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { UsersController } from './users/users.controller';
import { FoodsController } from './foods/foods.controller';
import { UsersService } from './users/users.service';
import { FoodsService } from './foods/foods.service';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationModule } from './notification/notification.module';
import { NotificationService } from './notification/notification.service';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutService } from './workout/workout.service';

@Module({
  imports: [PrismaModule, UsersModule, FoodsModule, NotificationModule, WorkoutModule],
  controllers: [AppController, UsersController, FoodsController, NotificationController, WorkoutController],
  providers: [AppService, UsersService, FoodsService, NotificationService, WorkoutService],
})
export class AppModule {}
