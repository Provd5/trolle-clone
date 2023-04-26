"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const column_controller_1 = require("../../controllers/column.controller");
const column_validation_1 = require("../../validations/column.validation");
const router = express_1.default.Router();
router.route("/").post(column_validation_1.ColumnValidation.createNew, column_controller_1.ColumnController.createNew);
router.route("/:id").put(column_validation_1.ColumnValidation.update, column_controller_1.ColumnController.update);
exports.ColumnRoutes = router;
