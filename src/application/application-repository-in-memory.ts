import { IApplicationRepository } from './application-repository.interface';
import { Application } from './application';

export class ApplicationRepositoryInMemory implements IApplicationRepository {
  applications: Application[] = [];
  async save(type: string, user: string): Promise<Application> {
    const id =
      this.applications.length === 0
        ? 1
        : this.applications[this.applications.length - 1].id + 1;
    const a = new Application(id, type, user);
    this.applications.push(a);
    return a;
  }

  async findByCreatedBy(user: string): Promise<Application[]> {
    return this.applications.filter(a => a.createdBy === user);
  }

  async deleteById(id: number, user: string): Promise<void> {
    this.applications = this.applications.filter(
      a => !(a.id === id && a.createdBy === user),
    );
  }
}
