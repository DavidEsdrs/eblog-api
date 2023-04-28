import { Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "./CreateUser.dto";
import { hash } from "argon2";
import { ForbiddenRequestError } from "../../../utils/httpErrors";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: ICreateUserDTO) {
        const credentialsTaken = await this.usersRepository.findByEmail(email);
        if(credentialsTaken) {
            throw new ForbiddenRequestError();
        }
        const pwdHash = await hash(password);
        const user = this.usersRepository.create({ email, password: pwdHash });
        await this.usersRepository.saveUser(user);
        return user;
    }
}