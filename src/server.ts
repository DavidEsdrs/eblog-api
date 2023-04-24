import express from "express";
import { router } from "./router";

const app = express();
app.use(express.json());
app.use(router);

const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, () => console.log(`running ${SERVER_PORT}`));