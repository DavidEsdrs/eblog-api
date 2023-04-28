import { UsersRepository } from "../../../repositories/implementations/UsersRepository"
import { GetProfileController } from "./GetProfile.controller";
import { GetProfileService } from "./GetProfile.service"

export const buildGetProfile = () => {
    const service = new GetProfileService(UsersRepository);
    const controller = new GetProfileController(service);
    return controller;
}