import { Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "./CreateUser.dto";
import { hash } from "argon2";
import { ForbiddenRequestError } from "../../../utils/httpErrors";

export class CreateUserService {
    constructor(
        private usersRepository: Repository<User>
    ) {}

    async execute({ email, password }: ICreateUserDTO) {
        const credentialsTaken = await this.usersRepository.findOne({ where: { email } });
        if(credentialsTaken) {
            throw new ForbiddenRequestError();
        }
        const pwdHash = await hash(password);
        const user = this.usersRepository.create({ email, password: pwdHash });
        await this.usersRepository.save(user);
        return user;
    }
}