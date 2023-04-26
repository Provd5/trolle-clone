import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";

import { connectDB } from "./config/mongodb";
import { v1Api } from "./routes/v1";

const hostname = process.env.SERVER_HOSTNAME;
const port = Number(process.env.SERVER_PORT);

export enum StatusCode {
  OK = 200,
  ERROR = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

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
  app.use(express.json());
  app.use("/v1", v1Api);

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};
