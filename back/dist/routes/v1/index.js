"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Api = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("../../server");
const board_route_1 = require("./board.route");
const card_route_1 = require("./card.route");
const column_route_1 = require("./column.route");
const router = express_1.default.Router();
router.get("/status", (req, res) => {
    res.status(server_1.StatusCode.OK).json({ status: "ok" });
});
router.use("/boards", board_route_1.BoardRoutes);
router.use("/columns", column_route_1.ColumnRoutes);
router.use("/cards", card_route_1.CardRoutes);
exports.v1Api = router;
