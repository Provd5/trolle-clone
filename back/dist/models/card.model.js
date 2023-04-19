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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsModel = void 0;
const joi_1 = __importDefault(require("joi"));
const mongodb_1 = require("../config/mongodb");
const collectionName = "cards";
const collectionSchema = joi_1.default.object({
    boardId: joi_1.default.string().required(),
    columnId: joi_1.default.string().required(),
    title: joi_1.default.string().required().min(1).max(255),
    desc: joi_1.default.string().default(null),
    cover: joi_1.default.string().default(null),
    createdAt: joi_1.default.date().timestamp().default(Date.now()),
    updatedAt: joi_1.default.date().timestamp().default(null),
    _destroy: joi_1.default.boolean().default(false),
});
const validateSchema = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collectionSchema.validateAsync(data, { abortEarly: false });
});
const createNew = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield validateSchema(data);
        const result = yield (0, mongodb_1.getDB)().collection(collectionName).insertOne(value);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.CardsModel = { createNew };
