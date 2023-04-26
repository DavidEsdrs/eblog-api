import { NextFunction, Request, Response } from "express";
import { createQueryValidator } from "../../../utils/createValidator";
import { z } from "zod";

const querySchema = z.object({
    limit: z.
        string().
        min(1).
        optional().
        transform(Number).
        refine(val => !isNaN(val), {
            message: "Limit must to be a valid numeric value!"
        }),
    offset: z.
        string().
        min(0).
        optional().
        transform(Number).
        refine(val => !isNaN(val), {
            message: "Offset must to be a valid numeric value!"
        })
});

export const parseQuery = createQueryValidator(querySchema);

export default [parseQuery]