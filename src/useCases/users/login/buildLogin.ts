import { RefreshTokenProvider } from "../../../providers/RefreshTokenProvider";
import { RefreshTokenRepository } from "../../../repositories/implementations/RefreshTokenRepository";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository";
import { LoginController } from "./Login.controller";
import { LoginService } from "./Login.service";

export const buildLogin = () => {
    const service = new LoginService(UsersRepository);
    const refreshTokenGenerator = new RefreshTokenProvider(RefreshTokenRepository, UsersRepository);
    const controller = new LoginController(service, refreshTokenGenerator);
    return controller;
}