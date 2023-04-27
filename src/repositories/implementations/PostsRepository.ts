import { Post } from "../../entities/Post";
import AppDataSource from "../../ormconfig";

export type AsBoolean<T> = {
    [P in keyof T]?: 
        T[P] extends Date ? boolean : 
            (T[P] extends object ? AsBoolean<T[P]> : boolean)
};

export const PostsRepository = AppDataSource.getRepository(Post).extend({
    async getFeaturedPosts({ limit = 10, offset = 0 }: { limit: number, offset: number }) {
        const posts = await this.find({
            select: {
                id: true,
                title: true,
                summary: true,
                created_at: true,
                updated_at: true,
                featured_image: true
            },
            take: limit,
            skip: offset,
            relations: ["creator"]
        });
        return posts;
    },

    async findPostById(id: number, select?: AsBoolean<Post>) {
        const post = await this.findOne({ 
            where: { id }, 
            select, 
            relations: select?.creator ? ["creator"] : [] 
        });
        return post;
    },

    async updatePost(id: number, { title, content, summary }: Pick<Partial<Post>, "title" | "summary" | "content">) {
        await this.update({ id }, { title, content, summary });
    }
});