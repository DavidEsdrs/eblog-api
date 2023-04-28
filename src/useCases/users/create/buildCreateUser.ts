import { User } from "../../../entities/User";
import AppDataSource from "../../../ormconfig";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository";
import { CreateUserController } from "./CreateUser.controller";
import { CreateUserService } from "./CreateUser.service"

export const buildCreateUser = () => {
    const service = new CreateUserService(UsersRepository);
    const controller = new CreateUserController(service);
    return controller;
}