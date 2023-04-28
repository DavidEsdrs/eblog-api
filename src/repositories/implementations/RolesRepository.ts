import { Role } from "../../entities/Role";
import AppDataSource from "../../ormconfig";

export const RolesRepository = AppDataSource.getRepository(Role).extend({});