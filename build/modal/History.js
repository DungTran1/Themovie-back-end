"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const HistorySchema = new Schema({
    movieIds: { type: Array, required: true },
    uid: { type: String, required: true },
}, { timestamps: true });
const History = mongoose_1.default.model("histories", HistorySchema);
exports.default = History;
