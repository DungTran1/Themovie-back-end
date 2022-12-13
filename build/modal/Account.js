"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AccountSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    birthday: { type: String },
    photoUrl: { type: String },
}, { timestamps: true });
const Account = mongoose_1.default.model("Account", AccountSchema);
exports.default = Account;
