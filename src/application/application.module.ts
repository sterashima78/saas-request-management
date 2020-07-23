import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { AuthModule } from '../auth/auth.module';
import { ApplicationRepository } from './application-repository';
@Module({
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    {
      provide: 'Plugin',
      useFactory: (): string => `${__dirname}/../../plugin.js`,
    },
    {
      provide: 'ApplicationRepository',
      useClass: ApplicationRepository,
    },
  ],
  imports: [AuthModule],
})
export class ApplicationModule {}
