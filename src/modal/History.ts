import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    movieIds: { type: Array, required: true },
    uid: { type: String, required: true },
  },
  { timestamps: true }
);
const History = mongoose.model("histories", HistorySchema);
export default History;
