import { Injectable, Inject } from '@nestjs/common';
import { PluginOption } from './types';
import { Application } from './application';
import { IApplicationRepository } from './application-repository.interface';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('Plugin') private readonly plugin: string | PluginOption[],
    @Inject('ApplicationRepository')
    private readonly repository: IApplicationRepository,
  ) {}
  async getApplications(): Promise<{ name: string }[]> {
    return this.resolvePlugin();
  }

  private async resolvePlugin(): Promise<PluginOption[]> {
    if (typeof this.plugin === 'string') {
      const plugins = [];
      const { plugins: p } = await import(this.plugin);
      for (const x of p) {
        const y = await import(x);
        plugins.push(y);
      }
      return plugins;
    } else {
      return this.plugin;
    }
  }

  async findTypeByName(name: string): Promise<PluginOption | undefined> {
    const applications = await this.getApplications();
    return applications.find(a => a.name === name);
  }

  async create(type: string, user: string): Promise<Application> {
    return this.repository.save(type, user);
  }
}
