import { User } from "../../../entities/User"
import AppDataSource from "../../../ormconfig"
import { RefreshTokenProvider } from "../../../providers/RefreshTokenProvider";
import { RefreshTokenRepository } from "../../../repositories/implementations/RefreshTokenRepository";
import { LoginController } from "./Login.controller";
import { LoginService } from "./Login.service";

export const buildLogin = () => {
    const usersRepository = AppDataSource.getRepository(User);
    const service = new LoginService(usersRepository);
    const refreshTokenGenerator = new RefreshTokenProvider(RefreshTokenRepository, usersRepository);
    const controller = new LoginController(service, refreshTokenGenerator);
    return controller;
}