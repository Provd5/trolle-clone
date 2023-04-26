import Joi from "joi";
import { ObjectId } from "mongodb";

import { getDB } from "../config/mongodb";

interface dataTypes {
  boardId: string;
  title: string;
  cardsOrder?: string[];
  createdAt?: Date;
  updatedAt?: Date | null;
  _destroy?: boolean;
}

const collectionName = "columns";
const collectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(1).max(255).trim(),
  cardsOrder: Joi.array().items(Joi.string().default([])),
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

const update = async (id: ObjectId, data: dataTypes) => {
  try {
    const result = await getDB()
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
    return result.value;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const ColumnModel = { createNew, update };
