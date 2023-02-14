import Comment from "../modal/Comment";
import express from "express";

const CommentController = {
  addComment: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = Number(req.params.id as string);
      const uid = req.body.uid;
      const content = req.body.content;
      const comments = req.body.comments;
      const displayName = req.body.displayName;
      const photoURL = req.body.photoURL;
      const newComment = new Comment({
        movieId,
        uid,
        displayName,
        content,
        comments,
        photoURL,
      }).save();
      return res.status(200).json(true);
    } catch (error) {
      console.log(error);
    }
  },

  getComment: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = req.body.movieId;
      const comment = await Comment.find({ movieId }).sort({
        createdAt: -1,
      });
      if (JSON.stringify(comment) !== "[]") {
        return res.status(200).json({ comment: comment });
      }
    } catch (error) {
      console.log(error);
    }
  },
  editComment: async (req: express.Request, res: express.Response) => {
    try {
      const edit = await Comment.findByIdAndUpdate(req.body._id, {
        content: req.body.content,
      });
      if (edit) {
        return res.status(200).send(true);
      }
    } catch (error) {}
  },
  removeComment: async (req: express.Request, res: express.Response) => {
    try {
      const _id = req.body._id;
      const removeChild = await Comment.deleteMany({
        $or: [{ comments: _id }, { _id }],
      });
      if (removeChild) {
        return res.status(200).send(true);
      }
      return res.status(200).send(false);
    } catch (error) {
      console.log(error);
    }
  },
  saveReaction: async (req: express.Request, res: express.Response) => {
    try {
      const uid = req.body.uid;
      const commentId = req.body.commentId;
      const displayName = req.body.displayName;
      const photoURL = req.body.photoURL;
      const type = req.body.type;
      const react = (await Comment.findOne({
        _id: commentId,
      })) as any;

      const userReacted = react?.reaction?.find((e: any) => e.uid === uid);
      if (uid) {
        if (userReacted) {
          const typeReacted = react.reaction.find(
            (e: { type: string; uid: string }) =>
              e.type === type && e.uid === uid
          );
          if (typeReacted) {
            Comment.updateOne(
              { _id: commentId },
              { $pull: { reaction: { uid } } }
            )
              .then(() => res.status(200).json(true))
              .catch((e) => console.log(e));
          } else {
            Comment.updateOne(
              { _id: commentId, "reaction.uid": uid },
              { $set: { "reaction.$.type": type } }
            )
              .then(() => res.status(200).json(true))
              .catch((e) => console.log(e));
          }
        } else {
          Comment.updateOne(
            { _id: commentId },
            { $push: { reaction: { uid, type, displayName, photoURL } } }
          ).then(() => res.status(200).json(true));
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default CommentController;
