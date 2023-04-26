import { Repository } from "typeorm";
import { ICreatePostDTO } from "./CreatePost.dto";
import { User } from "../../../entities/User";
import { Post } from "../../../entities/Post";

export class CreatePostService {
    constructor(
        private usersRepository: Repository<User>,
        private postsRepository: Repository<Post>
    ) {}

    async execute({ content, creator, summary, title, featured_image }: ICreatePostDTO) {
        const user = await this.usersRepository.findOne({ where: { id: creator } });
        if(!user) {
            throw new Error("User doesn't exist!");
        }
        const post = this.postsRepository.create({ content, creator: user, summary, title, featured_image });
        await this.postsRepository.save(post);
        return post;
    }
}