import AppDataSource from "./ormconfig";
import { Router } from "express";
import { User } from "./entities/User";
import { buildCreateUser } from "./useCases/users/create/buildCreateUser";

const router = Router();

router.get("/health", (req, res) => res.send("running"));

router.post("/signup", (req, res) => buildCreateUser().handle(req, res));

export { router }