import { Request, Response } from "express";

import { StatusCode } from "../server";
import { BoardService } from "../services/board.service";

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await BoardService.createNew(req.body);
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

export const BoardController = { createNew };
