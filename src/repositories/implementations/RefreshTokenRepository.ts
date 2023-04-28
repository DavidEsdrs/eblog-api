import { RefreshToken } from "../../entities/RefreshToken";
import AppDataSource from "../../ormconfig";

export const RefreshTokenRepository = AppDataSource.getRepository(RefreshToken).extend({
    async findByToken(token: string) {
        const rt = await this.findOne({ where: { token } });
        return rt;
    }
});