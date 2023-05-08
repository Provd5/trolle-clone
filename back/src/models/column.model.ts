import Joi from "joi";
import { ObjectId, PushOperator } from "mongodb";

import { getDB } from "../config/mongodb";

export interface ColumnDataTypes {
  _id: ObjectId;
  boardId: ObjectId;
  title: string;
  cardsOrder?: string[];
  createdAt?: number;
  updatedAt?: number | null;
  _destroy?: boolean;
}

const columnCollectionName = "columns";
const collectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(1).max(255).trim(),
  cardsOrder: Joi.array().items(Joi.string().default([])),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: ColumnDataTypes) => {
  return await collectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: ColumnDataTypes) => {
  try {
    const value = await validateSchema(data);
    const validatedValue = {
      ...value,
      boardId: new ObjectId(value.boardId),
    };
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(validatedValue);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

const pushCardOrder = async (columnId: string, cardId: string) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(columnId) },
        { $push: { cardsOrder: cardId } as PushOperator<Document> },
        { returnDocument: "after" }
      );
    return result.value;
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (id: ObjectId, data: ColumnDataTypes) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
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

export const ColumnModel = {
  columnCollectionName,
  createNew,
  pushCardOrder,
  update,
};
