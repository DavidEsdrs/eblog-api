import { Router } from "express";
import { buildCreateUser } from "./useCases/users/create/buildCreateUser";
import { buildLogin } from "./useCases/users/login/buildLogin";

const router = Router();

router.get("/health", (req, res) => res.send("running"));

router.post("/signup", (req, res) => buildCreateUser().handle(req, res));

router.post("/login", (req, res) => buildLogin().handle(req, res));

export { router }