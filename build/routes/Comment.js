"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const router = express_1.default.Router();
router.post("/add/:id", CommentController_1.default.addComment);
router.post("/reaction/:id", CommentController_1.default.saveReaction);
router.post("/", CommentController_1.default.getComment);
router.post("/remove", CommentController_1.default.removeComment);
router.post("/edit", CommentController_1.default.editComment);
exports.default = router;
