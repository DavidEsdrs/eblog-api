import { Post } from "../../entities/Post";
import AppDataSource from "../../ormconfig";

export const PostsRepository = AppDataSource.getRepository(Post).extend({
    async getFeaturedPosts({ limit = 10, offset = 0 }: { limit: number, offset: number }) {
        const posts = await this.createQueryBuilder("p").
            limit(limit).
            offset(offset).
            getMany();
        return posts;
    }
});