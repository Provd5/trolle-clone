import { CardModel } from "../models/card.model";

const createNew = async (data: any) => {
  try {
    const result = await CardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const CardService = { createNew };
