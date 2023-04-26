import { ObjectId } from "mongodb";

import { BoardDataTypes, BoardModel } from "../models/board.model";

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

    // remove cards array from the board and add to columns array
    board.columns?.forEach((column: { cards: []; _id: ObjectId }) => {
      column.cards = board.cards?.filter(
        (card: { columnId: ObjectId }) =>
          card.columnId.toString() === column._id.toString()
      );
    });
    delete board.cards;

    return board;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const BoardService = { createNew, getBoard };
