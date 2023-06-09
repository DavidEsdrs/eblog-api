import { Request, Response } from "express";
import { Post } from "../../../entities/Post";
import { ICreatePostDTO } from "./CreatePost.dto";

export interface ICreatePostService {
    execute(args: ICreatePostDTO): Promise<Post>;
}

export class CreatePostController {
    constructor(
        private service: ICreatePostService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id, file_props } = req;
        const { title, summary, content } = req.body;
        const post = await this.service.execute({ creator: user_id, content, title, summary, featured_image: file_props.file_name });
        return res.json(post);
    }
}