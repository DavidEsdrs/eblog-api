import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { IGetContentDTO } from "./GetContent.dto";

export class GetContentService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ id }: IGetContentDTO) {
        const post = await this.postsRepository.findPostById(id);
        if(!post) {
            throw new Error("The given post id doesn't exist!");
        }
        return post;
    }
}