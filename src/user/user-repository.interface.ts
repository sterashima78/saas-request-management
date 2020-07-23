import { User } from "./user";

export interface IUserRepository {
    save(user: User): Promise<User>;
    findByName(name: string): Promise<User | undefined>
}
