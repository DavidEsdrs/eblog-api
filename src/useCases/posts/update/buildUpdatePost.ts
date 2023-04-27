import { PostsRepository } from "../../../repositories/implementations/PostsRepository"
import { UpdatePostController } from "./UpdatePost.controller";
import { UpdatePostService } from "./UpdatePost.service"

export const buildUpdatePost = () => {
    const service = new UpdatePostService(PostsRepository);
    const controller = new UpdatePostController(service);
    return controller;
}