import { Injectable, Inject } from '@nestjs/common';
import { User } from './user';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly repository: IUserRepository,
  ) {}

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findByName(name: string): Promise<User | undefined> {
    return this.repository.findByName(name);
  }
}
