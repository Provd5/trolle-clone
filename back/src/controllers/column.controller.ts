import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { StatusCode } from "../server";
import { ColumnService } from "../services/column.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await ColumnService.createNew(req.body);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCode.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(StatusCode.SERVER_ERROR)
        .json({ error: "An unknown error occurred." });
    }
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: ObjectId };
    const result = await ColumnService.update(id, req.body);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCode.SERVER_ERROR).json({ error: error.message });
    } else {
      res
        .status(StatusCode.SERVER_ERROR)
        .json({ error: "An unknown error occurred." });
    }
  }
};

export const ColumnController = { createNew, update };
