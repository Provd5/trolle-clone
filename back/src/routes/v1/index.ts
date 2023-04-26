import express from "express";

import { StatusCode } from "../../server";
import { BoardRoutes } from "./board.route";
import { CardRoutes } from "./card.route";
import { ColumnRoutes } from "./column.route";

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(StatusCode.OK).json({ status: "ok" });
});

router.use("/boards", BoardRoutes);
router.use("/columns", ColumnRoutes);
router.use("/cards", CardRoutes);

export const v1Api = router;
