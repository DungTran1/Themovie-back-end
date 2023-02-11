import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    movieId: { type: Number, required: true },
    uid: { type: String, required: true },
    displayName: { type: String, required: true },
    photoURL: { type: String, default: "" },
    content: { type: String, default: "" },
    comments: { type: String, default: null },
    reaction: {
      type: Array<{
        displayName: String;
        photoURL: String;
        type: String;
        uid: String;
      }>,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comments", CommentSchema);
export default Comment;
