import { IApplicationRepository } from './application-repository.interface';
import { Application } from './application';

export class ApplicationRepositoryInMemory implements IApplicationRepository {
  private applications: Application[] = [];
  async save(type: string, user: string): Promise<Application> {
    const id =
      this.applications.length === 0
        ? 1
        : this.applications[this.applications.length - 1].id + 1;
    const a = new Application(id, type, user);
    this.applications.push(a);
    return a;
  }
}
