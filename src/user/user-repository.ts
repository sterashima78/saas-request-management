import { IUserRepository } from './user-repository.interface';
import { User } from './user';
import { promises } from 'fs';
export class UserRepository implements IUserRepository {
  private readonly filename = './data.user.tsv';

  async save(user: User): Promise<User> {
    const file = await (await promises.readFile(this.filename)).toString();
    const usernames = file.split('\n');
    if (!usernames.find(n => n === user.name)) usernames.push(user.name);
    await promises.writeFile(
      this.filename,
      usernames.filter(i => i !== '').join('\n'),
    );
    return user;
  }

  async findByName(name: string): Promise<User | undefined> {
    const file = await (await promises.readFile(this.filename)).toString();
    const n = file.split('\n').find(n => n === name);
    return !!n ? new User(n) : undefined;
  }
}
