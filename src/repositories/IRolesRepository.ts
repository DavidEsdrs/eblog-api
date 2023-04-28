import { Role } from "../entities/Role";

export interface IRolesRepository {
    create(args: Partial<Role>): Role;
    save(role: Role): Promise<void>;
}