import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
dotenv.config();

const uri = process.env.DB_URI;
const dbName = process.env.DATABASE_NAME;
let dbInstance: Db | null = null;

export const connectDB = async () => {
  if (!uri || uri.trim() === "") {
    throw new Error("DB_URI not found");
  }

  const client = new MongoClient(uri);
  dbInstance = client.db(dbName);
};

export const getDB = () => {
  if (!dbInstance) throw new Error("DATABASE_NAME not found");
  return dbInstance;
};
