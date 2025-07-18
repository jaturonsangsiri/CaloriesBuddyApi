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

@Module({
  imports: [PrismaModule, UsersModule, FoodsModule],
  controllers: [AppController, UsersController, FoodsController],
  providers: [AppService, UsersService, FoodsService],
})
export class AppModule {}
