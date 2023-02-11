import express, { Application } from "express";
import CommentController from "../controllers/CommentController";

const router = express.Router();

router.post("/add/:id", CommentController.addComment);
router.post("/reaction/:id", CommentController.saveReaction);
router.post("/", CommentController.getComment);
router.post("/remove", CommentController.removeComment);
router.post("/edit", CommentController.editComment);

export default router;
