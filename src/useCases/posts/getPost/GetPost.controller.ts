import { Request, Response } from "express";
import { Post } from "../../../entities/Post";
import { IGetPostDTO } from "./GetPost.dto";

export interface IGetPostService {
    execute(args: IGetPostDTO): Promise<Post>;
}

export class GetPostController {
    constructor(
        private service: IGetPostService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const id = Number(req.params.id);
        const post = await this.service.execute({ id, user_id });
        return res.json(post);
    }
}

export { IGetPostDTO };
