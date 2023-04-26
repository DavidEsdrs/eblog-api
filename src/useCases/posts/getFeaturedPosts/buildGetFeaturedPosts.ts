import { PostsRepository } from "../../../repositories/implementations/PostsRepository"
import { GetFeaturedPostsController } from "./GetFeaturedPosts.controller";
import { GetFeaturedPostsService } from "./GetFeaturedPosts.service"

export const buildGetFeaturedPost = () => {
    const service = new GetFeaturedPostsService(PostsRepository);
    const controller = new GetFeaturedPostsController(service);
    return controller;
}