import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { ResourceNotFoundError } from "../../../utils/httpErrors";
import { IGetContentDTO } from "./GetContent.dto";

export class GetContentService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ id }: IGetContentDTO) {
        const post = await this.postsRepository.findPostById(id);
        if(!post) {
            throw new ResourceNotFoundError("The given post id doesn't exist!");
        }
        return post;
    }
}