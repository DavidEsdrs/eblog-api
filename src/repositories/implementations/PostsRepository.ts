import { Post } from "../../entities/Post";
import AppDataSource from "../../ormconfig";
import { AsBoolean } from "../../utils/types";

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
    },

    async findPostsByUser(user_id: number, options?: { orderBy?: { [key: string]: "DESC" | "ASC" } }) {
        const posts = await this.find({ 
            select: {
                id: true,
                title: true,
                summary: true,
                created_at: true,
                featured_image: true,
                updated_at: true
            },
            where: { 
                creator: { 
                    id: user_id 
                } 
            },
            relations: ["creator"],
            order: {
                created_at: options.orderBy.createdAtOrder
            }
        });
        return posts;
    }
});

export { AsBoolean };
