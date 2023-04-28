import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { IGetProfileDTO } from "./GetProfile.dto";


export interface IGetProfileService {
    execute(args: IGetProfileDTO): Promise<User>;
}

export class GetProfileController {
    constructor(
        private service: IGetProfileService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id: requester_id } = req;
        const id = Number(req.params.id);
        const user = await this.service.execute({ id, requester_id });
        return res.json(user);
    }
}