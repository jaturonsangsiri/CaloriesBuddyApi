import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configSevice: ConfigService) => ({
        secret: configSevice.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configSevice.get<string>('JWT_EXPIRES_IN') || '60s'
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule { }
