import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const uri = process.env.DB_URI;

export const connectDB = async () => {
  if (!uri || uri.trim() === "") {
    throw new Error("DB_URI not found");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
