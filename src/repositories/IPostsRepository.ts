import { Repository } from "typeorm";
import { Post } from "../entities/Post";

export interface IPostsRepository extends Repository<Post> {
    getFeaturedPosts({ limit, offset }: { limit: number, offset: number }): Promise<Post[]>;
}