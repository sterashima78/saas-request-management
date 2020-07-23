import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplyDto } from './apply-dto';
import { AuthGuard } from '../auth.guard';
import { Application } from './application';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}
  @Get()
  async getApplications(): Promise<{ applications: { name: string }[] }> {
    const applications = await this.service.getApplications();
    return { applications };
  }

  @Post()
  @UseGuards(AuthGuard)
  async apply(
    @Body() apply: ApplyDto,
    @Headers('authorization') token: string,
  ): Promise<Application> {
    const a = await this.service.findTypeByName(apply.name);
    if (!a) throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    return this.service.create(apply.name, token);
  }
}
