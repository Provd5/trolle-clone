import Joi from "joi";
import { ObjectId, PushOperator } from "mongodb";

import { getDB } from "../config/mongodb";
import { CardModel } from "./card.model";
import { ColumnModel } from "./column.model";

export interface BoardDataTypes {
  _id?: ObjectId;
  title: string;
  columnsOrder?: string[];
  createdAt?: number;
  updatedAt?: number | null;
  _destroy?: boolean;
}

const boardCollectionName = "boards";
const collectionSchema = Joi.object({
  title: Joi.string().required().min(1).max(255).trim(),
  columnsOrder: Joi.array().items(Joi.string().default([])),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: BoardDataTypes) => {
  return await collectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: BoardDataTypes) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

const pushColumnOrder = async (boardId: string, columnId: string) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(boardId) },
        { $push: { columnsOrder: columnId } as PushOperator<Document> },
        { returnDocument: "after" }
      );

    return result.value;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getBoard = async (boardId: ObjectId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: new ObjectId(boardId), _destroy: false } },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (id: ObjectId, data: BoardDataTypes) => {
  try {
    const updateData = { ...data };

    const result = await getDB()
      .collection(boardCollectionName)
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

export const BoardModel = { createNew, pushColumnOrder, getBoard, update };
