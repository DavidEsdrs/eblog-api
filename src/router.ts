import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/buildCreateUser";
import { buildLogin } from "./useCases/users/login/buildLogin";
import { buildCreatePost } from "./useCases/posts/create/buildCreatePost";
import { createPostMiddlewares } from "./useCases/posts/create/CreatePost.middleware";
import { ensureAuthUser } from "./middlewares/authUser";
import { buildGetPost } from "./useCases/posts/getPost/buildGetPost";
import { buildGetFeaturedPost } from "./useCases/posts/getFeaturedPosts/buildGetFeaturedPosts";
import getFeaturedPostsMiddlewares from "./useCases/posts/getFeaturedPosts/GetFeaturedPosts.middleware";
import { buildGetContent } from "./useCases/posts/getContent/buildGetContent";

const router = Router();

router.get("/health", (req, res) => res.send("running"));

router.post("/signup", (req, res) => buildCreateUser().handle(req, res));

router.post("/login", (req, res) => buildLogin().handle(req, res));

router.post("/posts", ensureAuthUser, ...createPostMiddlewares, (req, res) => buildCreatePost().handle(req, res));

router.get("/posts/:id", ensureAuthUser, (req, res) => buildGetPost().handle(req, res));

router.get("/posts", ensureAuthUser, ...getFeaturedPostsMiddlewares, (req, res) => buildGetFeaturedPost().handle(req, res));

router.get("/posts/:id", ensureAuthUser, (req, res) => buildGetContent().handle(req, res));

export { router }