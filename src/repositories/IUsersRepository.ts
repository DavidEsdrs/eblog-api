import { User } from "../entities/User";
import { AsBoolean } from "./implementations/PostsRepository";

export interface IUsersRepository {
    create(args: Partial<User>): User;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveUser(user: User): Promise<void>;
}