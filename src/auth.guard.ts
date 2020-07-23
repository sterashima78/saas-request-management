import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Request } from "express";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest<Request>().header("Authorization")
    return this.validate(token);
  }
  async validate(token: string): Promise<boolean> {
    return this.service.check(token)
  }
}
