"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AccountSchema = new Schema({
    uid: { type: String, required: true },
    displayName: { type: String, required: true },
}, { timestamps: true });
const Account = mongoose_1.default.model("Account", AccountSchema);
exports.default = Account;
