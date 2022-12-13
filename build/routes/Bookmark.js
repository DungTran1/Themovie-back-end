"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookmarkController_1 = __importDefault(require("../controllers/BookmarkController"));
const router = express_1.default.Router();
router.post("/:id", BookmarkController_1.default.saveBookmark);
router.post("/", BookmarkController_1.default.getBookmark);
router.post("/delete/movie", BookmarkController_1.default.deleteBookmark);
exports.default = router;
