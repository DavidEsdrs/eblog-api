import { PostsRepository } from "../../../repositories/implementations/PostsRepository";
import { GetPostsByUserController } from "./GetPostsByUser.controller";
import { GetPostsByUserService } from "./GetPostsByUser.service"

export const buildGetPostsByUser = () => {
    const service = new GetPostsByUserService(PostsRepository);
    const controller = new GetPostsByUserController(service);
    return controller;
}