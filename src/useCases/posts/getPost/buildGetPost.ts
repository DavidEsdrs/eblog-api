import { PostsRepository } from "../../../repositories/implementations/PostsRepository";
import { GetPostController } from "./GetPost.controller";
import { GetPostService } from "./GetPost.service";

export const buildGetPost = () => {
    const service = new GetPostService(PostsRepository);
    const controller = new GetPostController(service);
    return controller;
}