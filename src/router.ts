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
import { buildGetPostFeaturedImage } from "./useCases/posts/getFeaturedImage/buildGetPostFeaturedImage";
import { buildUpdatePost } from "./useCases/posts/update/buildUpdatePost";
import { CreateRefreshTokenController } from "./useCases/users/refreshToken/CreateRefreshToken.controller";
import { RefreshTokenRepository } from "./repositories/implementations/RefreshTokenRepository";
import { buildGetProfileById, buildGetProfileByToken } from "./useCases/users/profile/buildGetProfile";
import { buildAddRole } from "./useCases/admin/addRole/buildAddRole";
import { addRoleMiddlewares } from "./useCases/admin/addRole/AddRole.middleware";
import { buildGetPostsByUser } from "./useCases/posts/getPostsByUser/buildGetPostsByUser";
import { healthcheck } from "./utils/healthcheck";

const router = Router();

router.get("/health", healthcheck);

router.post("/signup", (req, res) => buildCreateUser().handle(req, res));

router.post("/login", (req, res) => buildLogin().handle(req, res));

router.post("/posts", ensureAuthUser, ...createPostMiddlewares, (req, res) => buildCreatePost().handle(req, res));

router.get("/posts/:id", ensureAuthUser, (req, res) => buildGetPost().handle(req, res));

router.get("/posts", ensureAuthUser, ...getFeaturedPostsMiddlewares, (req, res) => buildGetFeaturedPost().handle(req, res));

router.get("/posts/:id/content", ensureAuthUser, (req, res) => buildGetContent().handle(req, res));

router.get("/posts/:id/image", ensureAuthUser, (req, res) => buildGetPostFeaturedImage().handle(req, res));

router.put("/posts/:id", ensureAuthUser, (req, res) => buildUpdatePost().handle(req, res));

router.get("/refresh", (req, res) => new CreateRefreshTokenController(RefreshTokenRepository).handle(req, res));

router.get("/users", ensureAuthUser, (req, res) => buildGetProfileByToken().handle(req, res));

router.get("/profile", ensureAuthUser, (req, res) => buildGetProfileByToken().handle(req, res));

router.post("/admin/users/:id/roles", ensureAuthUser, ...addRoleMiddlewares, (req, res) => buildAddRole().handle(req, res));

router.get("/users/:id/posts", ensureAuthUser, (req, res) => buildGetPostsByUser().handle(req, res));

export { router };