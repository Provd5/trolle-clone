import { BoardModel } from "../models/board.model";

const createNew = async (data: any) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const BoardService = { createNew };
