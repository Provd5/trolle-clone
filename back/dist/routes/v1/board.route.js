"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const board_controller_1 = require("../../controllers/board.controller");
const board_validation_1 = require("../../validations/board.validation");
const router = express_1.default.Router();
router
    .route("/")
    //   .get((req, res) => console.log("get boards"))
    .post(board_validation_1.BoardValidation.createNew, board_controller_1.BoardController.createNew);
exports.BoardRoutes = router;
