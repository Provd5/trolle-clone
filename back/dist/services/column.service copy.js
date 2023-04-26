"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnService = void 0;
const column_model_1 = require("../models/column.model");
const createNew = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield column_model_1.ColumnModel.createNew(data);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = Object.assign(Object.assign({}, data), { updatedAt: Date.now() });
        const result = yield column_model_1.ColumnModel.update(id, updateData);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.ColumnService = { createNew, update };
