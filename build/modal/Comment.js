"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    movieId: { type: Number, required: true },
    userId: { type: String, required: true },
    content: { type: String, default: "" },
    reaction: { type: (Array), default: [] },
    reply: { type: String, default: null },
}, { timestamps: true });
const Comment = mongoose_1.default.model("Comments", CommentSchema);
exports.default = Comment;
