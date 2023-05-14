import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { StatusCode } from "../server";
import { CardService } from "../services/card.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCode.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(StatusCode.SERVER_ERROR)
        .json({ error: StatusCode.UNKNOWN_ERROR_MSG });
    }
  }
};

const getCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: ObjectId };
    const result = await CardService.getCard(id);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCode.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(StatusCode.SERVER_ERROR)
        .json({ error: StatusCode.UNKNOWN_ERROR_MSG });
    }
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: ObjectId };
    const result = await CardService.update(id, req.body);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCode.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(StatusCode.SERVER_ERROR)
        .json({ error: StatusCode.UNKNOWN_ERROR_MSG });
    }
  }
};

export const CardController = { createNew, getCard, update };
