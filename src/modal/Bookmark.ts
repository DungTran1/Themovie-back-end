import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema(
  {
    movieIds: { type: Array, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);
const Bookmark = mongoose.model("bookmarks", BookmarkSchema);
export default Bookmark;
