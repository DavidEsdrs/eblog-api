import { User } from "../../entities/User";
import AppDataSource from "../../ormconfig";

export const UsersRepository = AppDataSource.getRepository(User).extend({
});