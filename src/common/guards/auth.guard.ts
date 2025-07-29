import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from 'src/contants/roles.decorator';
import { Role } from 'src/contants/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, 
    private readonly configService: ConfigService, 
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET')
      });

      // Assign payload to request
      request.user = payload;

      // Check user role
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(), 
        context.getClass()
      ]);

      if (requiredRoles && requiredRoles.length > 0) {
        if (!payload.role) {
          throw new ForbiddenException('No role assigned to user');
        }
        const hasRequiredRole = requiredRoles.includes(payload.role);

        if (!hasRequiredRole) {
          throw new ForbiddenException(`Insufficient permissions. Required: ${requiredRoles.join(', ')}, Got: ${payload.role}`);
        }
      }
      return true;

    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      // ถ้าเป็น JWT error ให้แสดงรายละเอียด
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token format');
      }

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }

      if (error.name === 'NotBeforeError') {
        throw new UnauthorizedException('Token not active');
      }

      throw new UnauthorizedException(`Authentication failed: ${error.message}`);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    const [type, token] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}