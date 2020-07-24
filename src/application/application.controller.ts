import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Headers,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplyDto } from './apply-dto';
import { AuthGuard } from '../auth.guard';
import { Application } from './application';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}
  @Get('/types')
  async getApplicationTypes(): Promise<{ applications: { name: string }[] }> {
    const applications = await this.service.getApplicationTypes();
    return { applications };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getApplications(
    @Headers('authorization') token: string,
  ): Promise<Application[]> {
    return this.service.getApplications(token);
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

  @Delete('/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async deleteApplication(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ): Promise<void> {
    this.service.deleteById(parseInt(id, 10), token);
  }
}
