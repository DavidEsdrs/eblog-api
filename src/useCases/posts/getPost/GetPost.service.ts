import { Repository } from "typeorm";
import { Post } from "../../../entities/Post";
import { IGetPostDTO } from "./GetPost.controller";
import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { ResourceNotFoundError } from "../../../utils/httpErrors";

export class GetPostService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ id, user_id }: IGetPostDTO) {
        const post = await this.postsRepository.findPostById(id, {
            id: true,
            title: true,
            created_at: true,
            creator: {
                id: true,
                email: true
            },
            summary: true,
            featured_image: true,
            updated_at: true
        });
        if(!post) {
            throw new ResourceNotFoundError();
        }
        return post;
    }
}