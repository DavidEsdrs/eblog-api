import { Post } from "../entities/Post";
import { AsBoolean } from "../utils/types";

export interface IPostsRepository {
    getFeaturedPosts({ limit, offset }: { limit: number, offset: number }): Promise<Post[]>;
    findPostById(id: number, select?: AsBoolean<Post>): Promise<Post>;
    updatePost(id: number, { title, content, summary }: Pick<Partial<Post>, "title" | "summary" | "content">): Promise<void>;
    findPostsByUser(user_id: number): Promise<Post[]>;
}