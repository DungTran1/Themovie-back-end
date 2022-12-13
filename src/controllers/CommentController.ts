import Comment from "../modal/Comment";
import express from "express";
import jwt, { verify } from "jsonwebtoken";
import bycript from "bcrypt";
import Account from "../modal/Account";
interface IComment {
  movieId: number;
  userId: string;
  content: string;
  reaction: Array<object>;
  reply: string;
}
interface IUser {
  name: string;
  password: string;
  email: string;
  address: string;
  birthday: string;
  photoUrl: string;
}
const CommentController = {
  saveComment: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = Number(req.params.id as string);
      const userId = req.body.userId;
      const content = req.body.content;
      const reply = req.body.reply;

      const newComment: any = new Comment({ movieId, userId, content, reply });
      newComment.save();
      const user: IUser | null = await Account.findById(userId);

      return res.json({
        comment: {
          ...newComment._doc,

          photoUrl: user?.photoUrl,
          name: user?.name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getComment: async (req: express.Request, res: express.Response) => {
    const movieId = req.body.movieId;
    const comment = await Comment.find({ movieId }).sort({
      createdAt: -1,
    });

    Promise.all(
      comment.map(async (item: any) => {
        const user = await Account.findById(item.userId);
        return { ...item._doc, photoUrl: user?.photoUrl, name: user?.name };
      })
    )
      .then((newComment) => {
        return res.json({ comment: newComment });
      })
      .catch((e) => console.log(e));
  },
  deleteComment: async (req: express.Request, res: express.Response) => {},
  saveReaction: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = Number(req.params.id);
      const userId = req.body.userId;
      const commentId = req.body.commentId;
      const reactionType = req.body.reactionType;
      const react: IComment = (await Comment.findOne({
        _id: commentId,
      })) as any;
      console.log(react, reactionType);
      if (react.reaction.length < 1) {
        Comment.updateOne(
          { _id: commentId },
          { $push: { reaction: { userId, reactionType } } }
        ).then((res) => console.log(res));
      } else {
        react.reaction.forEach((e: any) => {
          if (e.userId === userId) {
            if (e.reactionType === reactionType) {
              Comment.updateOne(
                { _id: commentId },
                { $pull: { reaction: { userId } } }
              )
                .then((res) => console.log(res))
                .catch((e) => console.log(e));
            } else {
              Comment.updateOne(
                { _id: commentId, "reaction.userId": userId },
                { $set: { "reaction.$.reactionType": reactionType } }
              )
                .then((res) => console.log(res))
                .catch((e) => console.log(e));
            }
          } else {
            Comment.updateOne(
              { _id: commentId },
              { $push: { reaction: { userId, reactionType } } }
            ).then((res) => console.log(res));
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default CommentController;
