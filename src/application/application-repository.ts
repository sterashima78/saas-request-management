import { IApplicationRepository } from './application-repository.interface';
import { Application } from './application';
import { promises } from 'fs';

export class ApplicationRepository implements IApplicationRepository {
  private readonly filename = './data.application.tsv';

  async save(type: string, name: string): Promise<Application> {
    const file = await (await promises.readFile(this.filename)).toString();
    const applications = file
      .split('\n')
      .filter(i => i !== '')
      .map(row => row.split('\t'))
      .map(([id, type, user]) => new Application(parseInt(id), type, user));
    const id =
      applications.length === 0
        ? 1
        : applications[applications.length - 1].id + 1;
    const application = new Application(id, type, name);
    await promises.writeFile(
      this.filename,
      [...applications, application]
        .map(a => `${a.id}\t${a.type}\t${a.createdBy}`)
        .join('\n'),
    );
    return application;
  }
}
