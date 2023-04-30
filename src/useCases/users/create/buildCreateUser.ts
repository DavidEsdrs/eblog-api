import { RolesRepository } from "../../../repositories/implementations/RolesRepository";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository";
import { CreateUserController } from "./CreateUser.controller";
import { CreateUserService } from "./CreateUser.service"

export const buildCreateUser = () => {
    const service = new CreateUserService(UsersRepository, RolesRepository);
    const controller = new CreateUserController(service);
    return controller;
}