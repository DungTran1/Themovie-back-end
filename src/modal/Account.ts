import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    uid: { type: String, required: true },
    displayName: { type: String, required: true },
  },
  { timestamps: true }
);
const Account = mongoose.model("Account", AccountSchema);
export default Account;
