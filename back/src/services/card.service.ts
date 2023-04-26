import { CardDataTypes, CardModel } from "../models/card.model";
import { ColumnModel } from "../models/column.model";

const createNew = async (data: CardDataTypes) => {
  try {
    const newCard = await CardModel.createNew(data);

    // update column order array
    await ColumnModel.pushCardOrder(
      data.columnId.toString(),
      newCard.insertedId.toString()
    );

    return newCard;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const CardService = { createNew };
