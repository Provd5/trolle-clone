import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";

import { connectDB } from "./config/mongodb";

const hostname = process.env.SERVER_HOSTNAME;
const port = Number(process.env.SERVER_PORT);

connectDB()
  .then(() => console.log("Connected to MongoDB!"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  if (!hostname || !port) {
    throw new Error("hostname and port must be specified");
  }

  const app: Express = express();

  app.get("/test", async (req: Request, res: Response) => {
    res.end("<h1>Hello World!</h1>");
  });

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};
