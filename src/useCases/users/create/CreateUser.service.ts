import { Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "./CreateUser.dto";

export class CreateUserService {
    constructor(
        private usersRepository: Repository<User>
    ) {}

    async execute({ email, password }: ICreateUserDTO) {
        const credentialsTaken = await this.usersRepository.findOne({ where: { email } });
        if(credentialsTaken) {
            throw new Error("Credentials taken!");
        }
        const user = this.usersRepository.create({ email, password });
        await this.usersRepository.save(user);
        return user;
    }
}