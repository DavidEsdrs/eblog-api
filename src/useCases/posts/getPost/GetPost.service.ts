import { Repository } from "typeorm";
import { Post } from "../../../entities/Post";
import { IGetPostDTO } from "./GetPost.controller";

export class GetPostService {
    constructor(
        private postsRepository: Repository<Post>
    ) {}

    async execute({ id, user_id }: IGetPostDTO) {
        const post = await this.postsRepository.findOne({ where: { id } });
        if(!post) {
            throw new Error("The given post id doesn't exist in database!");
        }
        return post;
    }
}