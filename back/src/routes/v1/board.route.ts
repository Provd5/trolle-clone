import express from "express";

import { BoardController } from "../../controllers/board.controller";
import { BoardValidation } from "../../validations/board.validation";

const router = express.Router();

router
  .route("/")
  .get(BoardController.getBoardsArray)
  .post(BoardValidation.createNew, BoardController.createNew);

router
  .route("/:id")
  .get(BoardController.getBoard)
  .put(BoardValidation.update, BoardController.update);

export const BoardRoutes = router;
