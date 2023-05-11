import { ObjectId } from "mongodb";

import { BoardModel } from "../models/board.model";
import { CardModel } from "../models/card.model";
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

const update = async (
  id: ObjectId,
  data: ColumnDataTypes & { cards?: string[] }
) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    if (updateData._id) delete updateData._id;
    if (updateData.cards) delete updateData.cards;
    const result = await ColumnModel.update(id, updateData);

    if (updateData._destroy && updateData.cardsOrder) {
      CardModel.deleteCards(updateData.cardsOrder);
    }

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const ColumnService = { createNew, update };
