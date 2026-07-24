import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async register(registerUserDto: RegisterUserDto): Promise<void> {
        await this.usersService.create(registerUserDto);
    }

    async signIn(
        loginUserDto: LoginUserDto,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByName(loginUserDto.username!);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const isMatch = await bcrypt.compare(loginUserDto.password!, user?.password!);

        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.user_id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
