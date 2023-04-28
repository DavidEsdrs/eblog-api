import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IGetProfileDTO } from "./GetProfile.dto";

export class GetProfileService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id, requester_id }: IGetProfileDTO) {
        const user = await this.usersRepository.findById(id);
        return user;
    }
}