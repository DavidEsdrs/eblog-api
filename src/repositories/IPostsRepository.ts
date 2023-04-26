import { Repository } from "typeorm";
import { Post } from "../entities/Post";
import { AsBoolean } from "./implementations/PostsRepository";

export interface IPostsRepository {
    getFeaturedPosts({ limit, offset }: { limit: number, offset: number }): Promise<Post[]>;
    findPostById(id: number, select?: AsBoolean<Post>): Promise<Post>;
}