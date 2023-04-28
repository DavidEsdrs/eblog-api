import { User } from "../entities/User";

export interface IUsersRepository {
    create(args: Partial<User>): User;
    findById(id: number): Promise<User>;
}