import { Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "./CreateUser.dto";
import { hash } from "argon2";
import { ForbiddenRequestError } from "../../../utils/httpErrors";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IRolesRepository } from "../../../repositories/IRolesRepository";

export class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private rolesRepository: IRolesRepository
    ) {}

    async execute({ email, password }: ICreateUserDTO) {
        const credentialsTaken = await this.usersRepository.findByEmail(email);
        if(credentialsTaken) {
            throw new ForbiddenRequestError();
        }
        const pwdHash = await hash(password);
        const role = this.rolesRepository.create({ type: "reader" });
        const user = this.usersRepository.create({ email, password: pwdHash, roles: [role] });
        await this.usersRepository.saveUser(user);
        return user;
    }
}