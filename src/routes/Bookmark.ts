import express, { Application } from "express";
import BookmarkController from "../controllers/BookmarkController";

const router = express.Router();

router.post("/:id", BookmarkController.saveBookmark);
router.post("/", BookmarkController.getBookmark);
router.post("/delete/movie", BookmarkController.deleteBookmark);
export default router;
