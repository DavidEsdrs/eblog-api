import express from "express";

const app = express();
app.use(express.json());

app.use("/", (req, res) => res.send("running"));

const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, () => console.log(`running ${SERVER_PORT}`));