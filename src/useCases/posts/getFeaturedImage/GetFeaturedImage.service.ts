import { IPostsRepository } from "../../../repositories/IPostsRepository";
import { IGetContentDTO } from "../getContent/GetContent.dto";
import fs from "fs";
import path from "path";

export class GetFeaturedImageService {
    constructor(
        private postsRepository: IPostsRepository
    ) {}

    async execute({ id }: IGetContentDTO) {
        const post = await this.postsRepository.findPostById(id, { featured_image: true });
        if(!post) {
            throw new Error("The post for the given id is invalid or doesn't have any image attached to!");
        }
        const filePath = path.resolve(__dirname, "..", "..", "..", "..", "uploads", "playlists", post.featured_image);
        const readableStream = fs.createReadStream(filePath);
        return readableStream;
    }
}