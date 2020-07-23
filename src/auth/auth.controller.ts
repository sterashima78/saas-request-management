import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/login')
    async login(@Body() login:LoginDto): Promise<{token: string}>{
        return this.authService.login(login)
    }
}
