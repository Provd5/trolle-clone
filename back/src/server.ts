import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";

import { connectDB } from "./config/mongodb";

// import { mapOrder } from "utils/mapOrder";
// mapOrder;

const app: Express = express();

const hostname = process.env.SERVER_HOSTNAME || "localhost";
const port = Number(process.env.PORT) || 4040;

connectDB().catch(console.log);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
