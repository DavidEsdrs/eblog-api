import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { fulfillPost } from "../../../utils/fulfillPost";
import { IGetPostsByUserDTO } from "./GetPostsByUser.controller";

export class GetPostsByUserService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ user }: IGetPostsByUserDTO) {
        const posts = await this.postsRepository.findPostsByUser(user);
        return posts.map(fulfillPost);
    }
}