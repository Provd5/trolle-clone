import { ObjectId } from "mongodb";

import { BoardDataTypes, BoardModel } from "../models/board.model";
import { ColumnDataTypes } from "../models/column.model";

const createNew = async (data: BoardDataTypes) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getBoard = async (boardId: ObjectId) => {
  try {
    const board = await BoardModel.getBoard(boardId);
    const transformBoard = { ...board };

    transformBoard.columns = transformBoard.columns.filter(
      (column: ColumnDataTypes) => !column._destroy
    );

    // remove cards array from the board and add to columns array
    transformBoard.columns?.forEach((column: { cards: []; _id: ObjectId }) => {
      column.cards = transformBoard.cards?.filter(
        (card: { columnId: ObjectId }) =>
          card.columnId.toString() === column._id.toString()
      );
    });
    delete transformBoard.cards;

    return transformBoard;
  } catch (error) {
    throw new Error(error as string);
  }
};

const update = async (
  id: ObjectId,
  data: ColumnDataTypes & { columns?: string[] }
) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;
    const result = await BoardModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const BoardService = { createNew, getBoard, update };
