import dotenv from "dotenv";

dotenv.config();
import express from "express";
import { bootstrap } from "./src/app.routes.js";

const app = express();
const port = 8080;

app.use(express.json());

bootstrap(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
