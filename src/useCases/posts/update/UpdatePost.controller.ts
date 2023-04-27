import { Request, Response } from "express";
import { IUpdatePostDTO } from "./UpdatePost.dto";

export interface IUpdatePostService {
    execute(args: IUpdatePostDTO): Promise<void>;
}

export class UpdatePostController {
    constructor(
        private service: IUpdatePostService
    ) {}
    
    async handle(req: Request, res: Response) {
        const { user_id: requester_id } = req;
        const id = Number(req.params.id);
        const { title, summary, content } = req.body;
        await this.service.execute({ id, title, summary, content, requester_id });
        return res.sendStatus(204);
    }
}