import { Repository } from "typeorm";
import { Post } from "../entities/Post";
import { AsBoolean } from "./implementations/PostsRepository";

export interface IPostsRepository {
    getFeaturedPosts({ limit, offset }: { limit: number, offset: number }): Promise<Post[]>;
    findPostById(id: number, select?: AsBoolean<Post>): Promise<Post>;
    updatePost(id: number, { title, content, summary }: Pick<Partial<Post>, "title" | "summary" | "content">): Promise<void>;
}