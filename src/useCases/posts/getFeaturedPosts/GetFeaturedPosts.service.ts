import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { fulfillPost } from "../../../utils/fulfillPost";
import { IGetFeaturedPostsDTO } from "./GetFeaturedPosts.dto";

export class GetFeaturedPostsService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ limit, offset }: IGetFeaturedPostsDTO) {
        const posts = await this.postsRepository.getFeaturedPosts({ limit, offset  });
        const fulfilledPost = posts.map(fulfillPost);
        return fulfilledPost;
    }
}