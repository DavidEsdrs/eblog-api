import { Post } from "../../../entities/Post"
import AppDataSource from "../../../ormconfig"
import { GetPostController } from "./GetPost.controller";
import { GetPostService } from "./GetPost.service";

export const buildGetPost = () => {
    const usersRepository = AppDataSource.getRepository(Post);
    const service = new GetPostService(usersRepository);
    const controller = new GetPostController(service);
    return controller;
}