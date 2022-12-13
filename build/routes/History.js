"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HistoryController_1 = __importDefault(require("../controllers/HistoryController"));
const router = express_1.default.Router();
router.post("/:id", HistoryController_1.default.saveHistory);
router.post("/", HistoryController_1.default.getHistory);
router.post("/delete/movie", HistoryController_1.default.deleteHistory);
exports.default = router;
