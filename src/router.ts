import AppDataSource from "./ormconfig";
import { Router } from "express";
import { User } from "./entities/User";

const router = Router();

router.get("/health", (req, res) => res.send("running"));

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const credentialsTaken = await AppDataSource.getRepository(User).findOne({ where: { email } });
    if(credentialsTaken) {
        throw new Error("Credentials taken!");
    }
    const user = AppDataSource.getRepository(User).create({ email, password });
    await AppDataSource.getRepository(User).save(user);
    return res.json(user);
});

export { router }