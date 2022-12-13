import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    birthday: { type: String },
    photoUrl: { type: String },
  },
  { timestamps: true }
);
const Account = mongoose.model("Account", AccountSchema);
export default Account;
