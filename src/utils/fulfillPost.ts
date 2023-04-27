import { Post } from "../entities/Post";

export const fulfillPost = (post: Post) => ({
    ...post,
    featured_image: `${process.env.API_URL}/posts/${post.id}/image`,
    content: `${process.env.API_URL}/posts/${post.id}/content`
});