import { Request, Response } from "express";
import { ILoginDTO } from "./Login.dto";
import { User } from "../../../entities/User";

interface ILoginService {
    execute(args: ILoginDTO): Promise<{ accessToken: string, user: User }>;
}

interface IRefreshTokenGenerator {
    execute(args: { email: string, subject: number }): Promise<string>;
}

export class LoginController {
    constructor(
        private service: ILoginService,
        private refreshTokenGenerator: IRefreshTokenGenerator
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const { accessToken, user } = await this.service.execute({ email, password });
        const refreshToken = await this.refreshTokenGenerator.execute({ email, subject: user.id });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            // secure: true,
            path: "/"
        });
        return res.json({ accessToken });
    }
}