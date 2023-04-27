import { PostsRepository } from "../../../repositories/implementations/PostsRepository"
import { GetFeaturedImageController } from "./GetFeaturedImage.controller";
import { GetFeaturedImageService } from "./GetFeaturedImage.service"

export const buildGetPostFeaturedImage = () => {
    const service = new GetFeaturedImageService(PostsRepository);
    const controller = new GetFeaturedImageController(service);
    return controller;
}