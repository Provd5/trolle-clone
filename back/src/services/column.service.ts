import { ObjectId } from "mongodb";

import { BoardModel } from "../models/board.model";
import { ColumnDataTypes, ColumnModel } from "../models/column.model";

const createNew = async (data: ColumnDataTypes) => {
  try {
    const newColumn = await ColumnModel.createNew(data);

    // update column order array
    await BoardModel.pushColumnOrder(
      data.boardId.toString(),
      newColumn.insertedId.toString()
    );

    return newColumn;
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (id: ObjectId, data: ColumnDataTypes) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const ColumnService = { createNew, update };
