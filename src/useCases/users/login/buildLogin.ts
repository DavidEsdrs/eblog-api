import { User } from "../../../entities/User"
import AppDataSource from "../../../ormconfig"
import { LoginController } from "./Login.controller";
import { LoginService } from "./Login.service";

export const buildLogin = () => {
    const usersRepository = AppDataSource.getRepository(User);
    const service = new LoginService(usersRepository);
    const controller = new LoginController(service);
    return controller;
}