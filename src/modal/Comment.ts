import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    movieId: { type: Number, required: true },
    userId: { type: String, required: true },
    content: { type: String, default: "" },
    reaction: { type: Array<Object>, default: [] },
    reply: { type: String, default: null },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comments", CommentSchema);
export default Comment;
