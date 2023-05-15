import { Request, Response } from "express";
import { Post } from "../../../entities/Post";

export interface IGetPostsByUserDTO {
    user: number;
    createdAtOrder: "ASC" | "DESC";
}

export interface IGetPostsByUserService {
    execute(args: IGetPostsByUserDTO): Promise<Post[]>;
}

export class GetPostsByUserController {
    constructor(
        private service: IGetPostsByUserService
    ) {}
    
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const createdAtOrder = req.query.createdAt as "ASC" | "DESC";
        const posts = await this.service.execute({ user: user_id, createdAtOrder });
        return res.json(posts);
    }
}