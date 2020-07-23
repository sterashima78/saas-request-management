import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './login-dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private readonly userSearvice: UserService) {}

  async login(login: LoginDto): Promise<{ token: string }> {
    const u = await this.userSearvice.findByName(login.name);
    if (!u) throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    return { token: u.name };
  }

  async check(token: string): Promise<boolean> {
    const u = await this.userSearvice.findByName(token);
    return !!u;
  }
}
