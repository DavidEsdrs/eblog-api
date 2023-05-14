import { Request, Response } from "express";
import { Post } from "../../../entities/Post";

export interface IGetPostsByUserDTO {
    user: number;
    
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
        const posts = await this.service.execute({ user: user_id });
        return res.json(posts);
    }
}