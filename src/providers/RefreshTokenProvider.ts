import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../repositories/IUsersRepository";

export class RefreshTokenProvider {
    constructor(
        private refreshTokenRepository: IRefreshTokenRepository,
        private usersRepository: IUsersRepository
    ) {}

    async execute({ subject, email }: { subject: number, email: string }) {
        const token = sign({ email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
            subject: String(subject),
            expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET_LIFESPAN
        });
        const issuer = this.usersRepository.create({ id: subject });
        await this.refreshTokenRepository.save({ token, issuer });
        return token;
    }
}