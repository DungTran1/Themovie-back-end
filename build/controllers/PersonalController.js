"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("../modal/Account"));
const PersonalController = {
    UploadProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const photoUrl = req.body.photoUrl;
            const upload = yield Account_1.default.findOneAndUpdate({ uid }, { photoUrl }, { new: true });
            if (upload) {
                return res.status(200).send("upload image successfully!");
            }
        }
        catch (error) { }
    }),
    DisplayNameChange: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const displayName = req.body.displayName;
            const changed = yield Account_1.default.findOneAndUpdate({
                uid,
            }, {
                displayName,
            });
            if (changed) {
                return res.status(200).send(true);
            }
            return res.status(200).send(false);
        }
        catch (error) { }
    }),
    DeleteAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const changed = yield Account_1.default.findOneAndDelete({
                uid,
            });
            if (changed) {
                return res.status(200).send(true);
            }
            return res.status(200).send(false);
        }
        catch (error) { }
    }),
};
exports.default = PersonalController;
