import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { router } from "./router";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

config({
    path: ".env.dev"
});

const app = express();
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if(origin === process.env.FRONT_END_URL) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
});
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, () => console.log(`running ${SERVER_PORT}`));