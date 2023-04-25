import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuthUser = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if(!auth) {
        throw new Error("Invalid token!");
    }
    const [, token] = auth.split(" ");
    if(!token) {
        throw new Error("Invalid token!");
    }
    verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, { ignoreExpiration: false }, (err, decoded) => {
        if(err) {
            throw new Error("Invalid JWT!");
        }
        req.user_id = Number(decoded);
        return next();
    });
}