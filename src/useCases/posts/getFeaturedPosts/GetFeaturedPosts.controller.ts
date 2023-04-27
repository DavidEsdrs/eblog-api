import { Request, Response } from "express";
import { Post } from "../../../entities/Post";
import { IGetFeaturedPostsDTO } from "./GetFeaturedPosts.dto";

interface IGetFeaturedPostsService {
    execute(args: IGetFeaturedPostsDTO): Promise<Post[]>;
}

export class GetFeaturedPostsController {
    constructor(
        private service: IGetFeaturedPostsService
    ) {}

    async handle(req: Request, res: Response) {
        const { limit, offset } = req.query;
        const posts = await this.service.execute({ limit: Number(limit), offset: Number(offset) });
        return res.json(posts);
    }
}