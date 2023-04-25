import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const createValidator = (schema: z.ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        } catch(err) {
            throw new Error("Invalid body");
        }
    }
}