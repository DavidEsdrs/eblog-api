import { Request, Response } from "express";
import { ILoginDTO } from "./Login.dto";

interface ILoginService {
    execute(args: ILoginDTO): Promise<string>;
}

export class LoginController {
    constructor(
        private service: ILoginService
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const accessToken = await this.service.execute({ email, password });
        return res.json({ accessToken });
    }
}