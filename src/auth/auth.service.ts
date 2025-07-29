import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService) {}
    
    async signIn(username: string, pass: string): Promise<{access_token: string}> {
        const user = await this.userService.findByName(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {
            userId: user.id, 
            username: user.accName,
            role: user.role
        };
        const access_token = await this.jwtService.signAsync(payload);
        return {access_token: access_token};
    }
}
