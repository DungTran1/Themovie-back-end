"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const History_1 = __importDefault(require("./History"));
const Bookmark_1 = __importDefault(require("./Bookmark"));
const Comment_1 = __importDefault(require("./Comment"));
const Personal_1 = __importDefault(require("./Personal"));
const app = (app) => {
    app.use("/history", History_1.default);
    app.use("/bookmark", Bookmark_1.default);
    app.use("/comment", Comment_1.default);
    app.use("/personal", Personal_1.default);
};
exports.default = app;
