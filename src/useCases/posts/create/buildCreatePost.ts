import { Post } from "../../../entities/Post";
import { User } from "../../../entities/User"
import AppDataSource from "../../../ormconfig"
import { CreatePostController } from "./CreatePost.controller";
import { CreatePostService } from "./CreatePost.service";

export const buildCreatePost = () => {
    const usersRepository = AppDataSource.getRepository(User);
    const postsRepository = AppDataSource.getRepository(Post);
    const service = new CreatePostService(usersRepository, postsRepository);
    const controller = new CreatePostController(service);
    return controller;
}