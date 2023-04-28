import { Repository } from "typeorm";
import { User } from "../../../entities/User";
import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import { ILoginDTO } from "./Login.dto";

export class LoginService {
    constructor(
        private usersRepository: Repository<User>
    ) {}

    async execute({ email, password }: ILoginDTO) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if(!user) {
            throw new Error("Invalid credentials!");
        }
        const pwdMatches = await verify(user.password, password);
        if(!pwdMatches) {
            throw new Error("Invalid credentials!");
        }
        const accessToken = sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, { 
            subject: String(user.id), 
            expiresIn: process.env.JWT_ACCESS_TOKEN_TIMESPAN 
        });
        return { accessToken, user };
    }
}