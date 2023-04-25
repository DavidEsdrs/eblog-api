import { User } from "../../../entities/User";
import AppDataSource from "../../../ormconfig";
import { CreateUserController } from "./CreateUser.controller";
import { CreateUserService } from "./CreateUser.service"

export const buildCreateUser = () => {
    const usersRepository = AppDataSource.getRepository(User);
    const service = new CreateUserService(usersRepository);
    const controller = new CreateUserController(service);
    return controller;
}