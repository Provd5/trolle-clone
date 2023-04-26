import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { StatusCode } from "../server";

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(1).max(255).trim(),
  });
  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res
      .status(StatusCode.ERROR)
      .json({ error: new Error(error as string).message });
  }
};

export const CardValidation = { createNew };
