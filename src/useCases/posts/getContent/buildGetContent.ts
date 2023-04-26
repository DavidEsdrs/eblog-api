import { PostsRepository } from "../../../repositories/implementations/PostsRepository"
import { GetContentController } from "./GetContent.controller";
import { GetContentService } from "./GetContent.service"

export const buildGetContent = () => {
    const service = new GetContentService(PostsRepository);
    const controller = new GetContentController(service);
    return controller;
}