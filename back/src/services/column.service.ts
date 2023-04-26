import { ObjectId } from "mongodb";

import { ColumnModel } from "../models/column.model";

const createNew = async (data: any) => {
  try {
    const result = await ColumnModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (id: ObjectId, data: any) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const ColumnService = { createNew, update };
