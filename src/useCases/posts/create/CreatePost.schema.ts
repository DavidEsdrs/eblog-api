import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const postSchema = z.object({
    title: z
        .string()
        .min(5)
        .max(100),
    summary: z
        .string()
        .min(10)
        .max(255),
    content: z
        .string()
        .min(100)
});