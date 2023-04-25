import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/buildCreateUser";
import { buildLogin } from "./useCases/users/login/buildLogin";
import { buildCreatePost } from "./useCases/posts/create/buildCreatePost";
import { createValidator } from "./utils/createValidator";
import { postSchema } from "./useCases/posts/create/CreatePost.schema";

const router = Router();

router.get("/health", (req, res) => res.send("running"));

router.post("/signup", (req, res) => buildCreateUser().handle(req, res));

router.post("/login", (req, res) => buildLogin().handle(req, res));

router.post("/posts", createValidator(postSchema), (req, res) => buildCreatePost().handle(req, res));

export { router }