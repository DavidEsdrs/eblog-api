import { Request, Response } from "express";
import { IGetFeaturedImageDTO } from "./IGetFeaturedImage.dto";
import { ReadStream } from "fs";

export interface IGetFeaturedImageService {
    execute(args: IGetFeaturedImageDTO): Promise<ReadStream>;
}

export class GetFeaturedImageController {
    constructor(
        private service: IGetFeaturedImageService
    ) {}

    async handle(req: Request, res: Response) {
        const id = Number(req.params.id);
        const image = await this.service.execute({ id });
        return image.pipe(res);
    }
}