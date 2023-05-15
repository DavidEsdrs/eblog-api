import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { fulfillPost } from "../../../utils/fulfillPost";
import { IGetPostsByUserDTO } from "./GetPostsByUser.controller";

export class GetPostsByUserService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ user, createdAtOrder }: IGetPostsByUserDTO) {
        const posts = await this.postsRepository.findPostsByUser(user, {
            orderBy: {
                createdAtOrder
            }
        });
        return posts.map(fulfillPost);
    }
}