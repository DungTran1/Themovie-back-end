import express, { Application } from "express";
import CommentController from "../controllers/CommentController";

const router = express.Router();

router.post("/:id", CommentController.saveComment);
router.post("/reaction/:id", CommentController.saveReaction);
router.post("/", CommentController.getComment);
router.post("/delete/movie", CommentController.deleteComment);
export default router;
