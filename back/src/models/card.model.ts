import Joi from "joi";
import { ObjectId } from "mongodb";

import { getDB } from "../config/mongodb";

export interface CardDataTypes {
  _id?: ObjectId;
  boardId: ObjectId;
  columnId: ObjectId;
  title: string;
  desc?: string | null;
  cover?: string | null;
  createdAt?: number;
  updatedAt?: number | null;
  _destroy?: boolean;
}

const cardCollectionName = "cards";
const collectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(1).max(255).trim(),
  desc: Joi.string().default(null),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: CardDataTypes) => {
  return await collectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: CardDataTypes) => {
  try {
    const value = await validateSchema(data);
    const validatedValue = {
      ...value,
      boardId: new ObjectId(value.boardId),
      columnId: new ObjectId(value.columnId),
    };

    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(validatedValue);

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

const deleteCards = async (ids: string[]) => {
  try {
    const transformIds = ids.map((id) => new ObjectId(id));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } });

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (id: ObjectId, data: CardDataTypes) => {
  try {
    const updateData = { ...data };

    if (data.boardId) {
      updateData.boardId = new ObjectId(data.boardId);
    }
    if (data.columnId) {
      updateData.columnId = new ObjectId(data.columnId);
    }

    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    return result.value;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const CardModel = { cardCollectionName, createNew, deleteCards, update };
