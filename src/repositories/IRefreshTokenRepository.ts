import { RefreshToken } from "../entities/RefreshToken";

export interface IRefreshTokenRepository {
    save(args: Partial<RefreshToken>): Promise<void>;
    findByToken(token: string): Promise<RefreshToken>;
}