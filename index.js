import dotenv from "dotenv";

dotenv.config();
import express from "express";
import { bootstrap } from "./src/app.routes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 3001;

app.use(express.json());

bootstrap(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
