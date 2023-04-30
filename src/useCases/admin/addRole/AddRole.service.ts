import { Role, Roles } from "../../../entities/Role";
import { User } from "../../../entities/User";
import { IRolesRepository } from "../../../repositories/IRolesRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ForbiddenRequestError } from "../../../utils/httpErrors";
import { IAddRoleDTO } from "./AddRole.dto";

export class AddRoleService {
    // Lower index roles are more powerful
    roles = ["root", "editor", "author", "reader"];

    constructor(
        private usersRepository: IUsersRepository,
        private rolesRepository: IRolesRepository
    ) {}

    async execute({ id, requester_id, role }: IAddRoleDTO) {
        const requester = await this.usersRepository.findById(requester_id);
        const user = await this.usersRepository.findById(id);
        const requesterHighestRole = this.getHighestRole(requester.roles);
        const userHighestRole = this.getHighestRole(user.roles);
        if(requesterHighestRole === "reader") {
            throw new Error("Reader can't change roles!");
        }
        if(!this.checkPermission(requesterHighestRole, userHighestRole)) {
            throw new ForbiddenRequestError();
        }
        if(this.alreadyHasRole(user, role)) {
            throw new Error("User already has role!");
        }
        const roleObj = this.rolesRepository.create({ type: role, user });
        await this.rolesRepository.save(roleObj);
    }

    checkPermission(requesterRole: string, wantedRole: string): boolean {
        const requesterRoleLevel = this.roles.indexOf(requesterRole);
        const userRoleLevel = this.roles.indexOf(wantedRole);
        if(requesterRoleLevel < userRoleLevel) {
            return true
        }
        return false;
    }

    getHighestRole(roles: Role[]): Roles {
        return roles
            .reduce((prev, curr) => this.roles.indexOf(curr.type) < this.roles.indexOf(prev.type) ? curr : prev).type;
    }

    alreadyHasRole(user: User, wantedRole: string) {
        return user.roles.find(role => role.type === wantedRole);
    }
}