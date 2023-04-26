import { createBodyValidator } from "../../../utils/createValidator";
import { postSchema } from "./CreatePost.schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import mime from "mime";
import { NextFunction, Request, Response } from "express";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

export const validatePost = createBodyValidator(postSchema);

export const parsePost = (file_field: string) => {
    const config = {
        URL: path.basename("uploads"),

        storage(): multer.StorageEngine {
            return multer.diskStorage({
                destination(req, file, cb) {
                    if(!fs.existsSync(config.URL)) {
                        fs.mkdirSync(config.URL);
                        fs.mkdirSync(path.join(config.URL, "playlists"));
                    }
                    cb(null, path.join(config.URL, "playlists"));
                },

                filename(req, file, cb) {
                    const file_type = mime.getExtension(file.mimetype);
                    const file_name = `${new Date().getTime()}.${file.originalname.split(".").pop()}`;
                    req.file_props = { file_name, file_type };
                    cb(null, file_name);
                }
            });
        },

        fileFilter() {
            return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
                const file_type = mime.getExtension(file.mimetype);
                const conditions = ["png", "jpg", "jpeg"];
                if(!conditions.includes(file_type)) {
                    return cb(new Error("File type not supported!"));
                }
                cb(null, true);
            }
        }
    }

    return multer({
        storage: config.storage(),
        fileFilter: config.fileFilter()
    }).single(file_field);
}

export const sanitizeContent = (req: Request, res: Response, next: NextFunction) => {
    const dom = new JSDOM();
    const domPurify = DOMPurify(dom.window);
    const cleanContent = domPurify.sanitize(req.body.content);
    req.body.content = cleanContent;
    return next();
}

const createPostMiddlewares = [ parsePost("featured_image"), sanitizeContent, validatePost ];

export { createPostMiddlewares };