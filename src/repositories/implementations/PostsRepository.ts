import { Post } from "../../entities/Post";
import AppDataSource from "../../ormconfig";

export type AsBoolean<T> = {
    [P in keyof T]?: 
        T[P] extends Date ? boolean : 
            (T[P] extends object ? AsBoolean<T[P]> : boolean)
};

export const PostsRepository = AppDataSource.getRepository(Post).extend({
    async getFeaturedPosts({ limit = 10, offset = 0 }: { limit: number, offset: number }) {
        const posts = await this.createQueryBuilder("p").
            limit(limit).
            offset(offset).
            getMany();
        return posts;
    },

    async findPostById(id: number, select?: AsBoolean<Post>) {
        const post = await this.findOne({ 
            where: { id }, 
            select, 
            relations: select?.creator ? ["creator"] : [] 
        });
        return post;
    }
});