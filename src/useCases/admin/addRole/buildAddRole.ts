import { RolesRepository } from "../../../repositories/implementations/RolesRepository";
import { UsersRepository } from "../../../repositories/implementations/UsersRepository"
import { AddRoleController } from "./AddRole.controller";
import { AddRoleService } from "./AddRole.service"

export const buildAddRole = () => {
    const service = new AddRoleService(UsersRepository, RolesRepository);
    const controller = new AddRoleController(service);
    return controller;
}