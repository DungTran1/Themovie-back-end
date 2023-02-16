import express from "express";
import HistoryController from "../controllers/HistoryController";

const router = express.Router();

router.post("/:id", HistoryController.saveHistory);
router.post("/", HistoryController.getHistory);
router.post("/delete/movie", HistoryController.deleteHistory);
export default router;
