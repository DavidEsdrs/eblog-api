import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const createBodyValidator = (schema: z.ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        } catch(err) {
            throw new Error("Invalid body");
        }
    }
}

export const createQueryValidator = (schema: z.ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedQuery = schema.parse(req.query);
            req.query = parsedQuery;
            return next();
        } catch(err) {
            throw new Error("Query params couldn't be parsed!");
        }
    }
}