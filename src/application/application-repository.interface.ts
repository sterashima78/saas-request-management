import { Application } from './application';

export interface IApplicationRepository {
  save(type: string, user: string): Promise<Application>;
  findByCreatedBy(user: string): Promise<Application[]>;
  deleteById(id: number, user: string): Promise<void>;
}
