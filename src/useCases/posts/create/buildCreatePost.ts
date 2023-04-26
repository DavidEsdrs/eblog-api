import { Post } from "../../../entities/Post";
import { User } from "../../../entities/User"
import AppDataSource from "../../../ormconfig"
import { PostsRepository } from "../../../repositories/implementations/PostsRepository";
import { CreatePostController } from "./CreatePost.controller";
import { CreatePostService } from "./CreatePost.service";

export const buildCreatePost = () => {
    const usersRepository = AppDataSource.getRepository(User);
    const service = new CreatePostService(usersRepository, PostsRepository);
    const controller = new CreatePostController(service);
    return controller;
}