import { UsersRepository } from "../../../repositories/implementations/UsersRepository"
import { GetProfileByIdController } from "./GetProfileById.controller";
import { GetProfileService } from "./GetProfile.service"
import { GetProfileByTokenController } from "./GetProfileByToken";

export const buildGetProfileById = () => {
    const service = new GetProfileService(UsersRepository);
    const controller = new GetProfileByIdController(service);
    return controller;
}

export const buildGetProfileByToken = () => {
    const service = new GetProfileService(UsersRepository);
    const controller = new GetProfileByTokenController(service);
    return controller;
}