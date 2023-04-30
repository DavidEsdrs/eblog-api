import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { IGetProfileDTO } from "./GetProfile.dto";


export interface IGetProfileService {
    execute(args: IGetProfileDTO): Promise<User>;
}

export class GetProfileByTokenController {
    constructor(
        private service: IGetProfileService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id: id } = req;
        const user = await this.service.execute({ id, requester_id: id });
        return res.json(user);
    }
}