"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    movieId: { type: Number, required: true },
    uid: { type: String, required: true },
    displayName: { type: String, required: true },
    photoURL: { type: String, default: "" },
    content: { type: String, default: "" },
    comments: { type: String, default: null },
    reaction: {
        type: (Array),
    },
}, { timestamps: true });
const Comment = mongoose_1.default.model("Comments", CommentSchema);
exports.default = Comment;
