import { Request, Response } from "express";
import { IRefreshTokenRepository } from "../../../repositories/IRefreshTokenRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export class CreateRefreshTokenController {
    constructor(
        private refreshTokenRepository: IRefreshTokenRepository
    ) {}

    async handle(req: Request, res: Response) {
        const cookies = req.cookies;
        if(!cookies.refreshToken) {
            throw new Error("No cookies found!");
        }
        const refreshTokenInCookie = cookies.refreshToken;
        const refreshToken = await this.refreshTokenRepository.findByToken(refreshTokenInCookie);
        if(!refreshToken) {
            throw new Error("Refresh token invalid!");
        }
        verify(
            refreshTokenInCookie,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            async (err: Error, decoded: JwtPayload) => {
                if(err) {
                    throw new Error("Invalid JWT!");
                }
                const accessToken = sign({ email: decoded.email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.JWT_ACCESS_TOKEN_TIMESPAN,
                    subject: decoded.sub
                });
                return res.json({ accessToken });
            }
        );
    }
}