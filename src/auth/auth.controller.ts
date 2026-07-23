
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AllowAnonim } from './decorators/allowanonim.decorator';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @AllowAnonim()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto);
    }

    @AllowAnonim()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
