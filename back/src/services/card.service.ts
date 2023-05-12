import { ObjectId } from "mongodb";

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

const update = async (
  id: ObjectId,
  data: CardDataTypes & { columns?: string[] }
) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    if (updateData._id) delete updateData._id;
    const result = await CardModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const CardService = { createNew, update };
