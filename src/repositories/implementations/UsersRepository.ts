import { User } from "../../entities/User";
import AppDataSource from "../../ormconfig";

export const UsersRepository = AppDataSource.getRepository(User).extend({
    async findById(id: number) {
        const user = await this.findOne({ where: { id } });
        return user;
    },

    async findByEmail(email: string) {
        const user = await this.findOne({ where: { email } });
        return user;
    },

    async saveUser(user: User) {
        await this.save(user);
    }
});