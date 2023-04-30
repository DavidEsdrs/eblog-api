import { Request, Response } from "express";
import { IAddRoleDTO } from "./AddRole.dto";

export interface IAddRoleService {
    execute(args: IAddRoleDTO): Promise<void>;
}

export class AddRoleController {
    constructor(
        private service: IAddRoleService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id: requester_id } = req;
        const id = Number(req.params.id);
        const { role } = req.body;
        await this.service.execute({ id, requester_id, role });
        return res.sendStatus(204);
    }
}