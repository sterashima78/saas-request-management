import { Application } from './application';

export interface IApplicationRepository {
  save(type: string, user: string): Promise<Application>;
}
