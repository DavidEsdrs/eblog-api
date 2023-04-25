import { Repository } from "typeorm";
import { Post } from "../../../entities/Post";
import { IGetPostDTO } from "./GetPost.controller";

export class GetPostService {
    constructor(
        private postsRepository: Repository<Post>
    ) {}

    async execute({ id, user_id }: IGetPostDTO) {
        const post = await this.postsRepository.findOne({ where: { id } });
        return post;
    }
}