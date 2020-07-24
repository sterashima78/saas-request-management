import { IApplicationRepository } from './application-repository.interface';
import { Application } from './application';
import { promises } from 'fs';

export class ApplicationRepository implements IApplicationRepository {
  private readonly filename = './data.application.tsv';

  private async readApplications(): Promise<Application[]> {
    const file = await (await promises.readFile(this.filename)).toString();
    return file
      .split('\n')
      .filter(i => i !== '')
      .map(row => row.split('\t'))
      .map(([id, type, user]) => new Application(parseInt(id), type, user));
  }

  private async writeApplications(applications: Application[]): Promise<void> {
    await promises.writeFile(
      this.filename,
      applications.map(a => `${a.id}\t${a.type}\t${a.createdBy}`).join('\n'),
    );
  }

  async save(type: string, name: string): Promise<Application> {
    const applications = await this.readApplications();
    const id =
      applications.length === 0
        ? 1
        : applications[applications.length - 1].id + 1;
    const application = new Application(id, type, name);
    await this.writeApplications([...applications, application]);
    return application;
  }

  async findByCreatedBy(user: string): Promise<Application[]> {
    const applications = await this.readApplications();
    return applications.filter(a => a.createdBy === user);
  }

  async deleteById(id: number, user: string): Promise<void> {
    const applications = await this.readApplications();
    const a = applications.filter(a => !(a.id === id && a.createdBy === user));
    await this.writeApplications(a);
  }
}
