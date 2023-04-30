import { Roles } from "../../../entities/Role";

export interface IAddRoleDTO {
    requester_id: number;
    id: number;
    role: Roles;
}