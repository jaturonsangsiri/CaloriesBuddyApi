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
import { ActivitiesController } from './activities/activities.controller';
import { ActivitiesService } from './activities/activities.service';
import { ActivitiesModule } from './activities/activities.module';
import { MealController } from './meal/meal.controller';
import { MealService } from './meal/meal.service';
import { MealModule } from './meal/meal.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, UsersModule, FoodsModule, NotificationModule, WorkoutModule, ActivitiesModule, MealModule],
  controllers: [AppController, AuthController, UsersController, FoodsController, NotificationController, WorkoutController, ActivitiesController, MealController],
  providers: [AppService, AuthService, UsersService, FoodsService, NotificationService, WorkoutService, ActivitiesService, MealService],
})
export class AppModule {}
