import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { IGetFeaturedPostsDTO } from "./GetFeaturedPosts.dto";

export class GetFeaturedPostsService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ limit, offset }: IGetFeaturedPostsDTO) {
        const posts = await this.postsRepository.getFeaturedPosts({ limit, offset });
        return posts;
    }
}