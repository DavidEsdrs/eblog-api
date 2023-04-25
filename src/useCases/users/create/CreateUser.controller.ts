import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "./CreateUser.dto";

interface ICreateUserService {
    execute(args: ICreateUserDTO): Promise<User>;
}

export class CreateUserController {
    constructor(
        private service: ICreateUserService
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await this.service.execute({ email, password });
        return res.json(user);
    }
}