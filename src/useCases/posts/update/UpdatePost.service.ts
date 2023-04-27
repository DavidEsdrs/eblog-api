import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { IUpdatePostDTO } from "./UpdatePost.dto";

export class UpdatePostService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ id, title, content, summary, requester_id }: IUpdatePostDTO) {
        const post = await this.postsRepository.findPostById(id, { creator: { id: true } });
        if(post.creator.id !== requester_id) {
            throw new Error("Invalid request!");
        }
        await this.postsRepository.updatePost(id, { title, content, summary });
    }
}