import express from "express";
import CommentController from "../controllers/CommentController";

const router = express.Router();
router.post("/", CommentController.getComment);
router.post("/add/:id", CommentController.addComment);
router.post("/reaction/:id", CommentController.saveReaction);
router.post("/edit", CommentController.editComment);
router.post("/remove", CommentController.removeComment);
router.post("/uploadProfileComment", CommentController.uploadProfileComment);

export default router;
