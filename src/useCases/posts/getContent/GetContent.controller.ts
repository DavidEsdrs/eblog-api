import { Request, Response } from "express";
import { Post } from "../../../entities/Post";
import { IGetContentDTO } from "./GetContent.dto";

export interface IGetContentService {
    execute(args: IGetContentDTO): Promise<Post>;
}

export class GetContentController {
    constructor(
        private service: IGetContentService
    ) {}

    async handle(req: Request, res: Response) {
        const id = Number(req.params.id);
        const postContent = await this.service.execute({ id });
        return res.json(postContent);
    }
}