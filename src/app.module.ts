import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [UserModule, AuthModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
