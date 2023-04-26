import Joi from "joi";

import { getDB } from "../config/mongodb";

interface dataTypes {
  title: string;
  columnsOrder?: string[];
  createdAt?: Date;
  updatedAt?: Date | null;
  _destroy?: boolean;
}

const collectionName = "boards";
const collectionSchema = Joi.object({
  title: Joi.string().required().min(1).max(255).trim(),
  columnsOrder: Joi.array().items(Joi.string().default([])),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: dataTypes) => {
  return await collectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: dataTypes) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB().collection(collectionName).insertOne(value);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const BoardModel = { createNew };
