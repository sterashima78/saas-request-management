import { IUserRepository } from './user-repository.interface';
import { User } from './user';
export class UserRepositoryInMemory implements IUserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
  async findByName(name: string): Promise<User | undefined> {
    return this.users.find(u => u.name === name);
  }
  clear(): void {
    this.users.length = 0;
  }
}
