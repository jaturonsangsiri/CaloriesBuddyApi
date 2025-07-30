import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private jwtService: JwtService, private readonly configService: ConfigService) { }

  async signIn(username: string, pass: string) {
    const user = await this.userService.findByName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      userId: user.id,
      username: user.accName,
      role: user.role
    };
    const token = await this.jwtService.signAsync(payload, { expiresIn: this.configService.get<string>('JWT_TOKEN_EXPIRES') });
    const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES') });
    return { success: true, message: "Request Successfully", data: { token: token, refreshToken: refresh_token, id: user.id, role: user.role, name: user.name, profileImg: user.profileImg } };
  }
}
