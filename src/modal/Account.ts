import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: "" },
    birthday: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);
const Account = mongoose.model("Account", AccountSchema);
export default Account;
