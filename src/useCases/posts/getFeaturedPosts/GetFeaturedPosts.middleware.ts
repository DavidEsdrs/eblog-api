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
        }).
        catch(10),
    offset: z.
        string().
        min(0).
        optional().
        transform(Number).
        refine(val => !isNaN(val), {
            message: "Offset must to be a valid numeric value!"
        }).
        catch(0)
}).optional();

export const parseQuery = createQueryValidator(querySchema);

export default [parseQuery]