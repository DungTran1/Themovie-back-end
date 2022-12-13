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
const Comment_1 = __importDefault(require("../modal/Comment"));
const Account_1 = __importDefault(require("../modal/Account"));
const CommentController = {
    saveComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = Number(req.params.id);
            const userId = req.body.userId;
            const content = req.body.content;
            const reply = req.body.reply;
            const newComment = new Comment_1.default({ movieId, userId, content, reply });
            newComment.save();
            const user = yield Account_1.default.findById(userId);
            return res.json({
                comment: Object.assign(Object.assign({}, newComment._doc), { photoUrl: user === null || user === void 0 ? void 0 : user.photoUrl, name: user === null || user === void 0 ? void 0 : user.name }),
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const movieId = req.body.movieId;
        const comment = yield Comment_1.default.find({ movieId }).sort({
            createdAt: -1,
        });
        Promise.all(comment.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield Account_1.default.findById(item.userId);
            return Object.assign(Object.assign({}, item._doc), { photoUrl: user === null || user === void 0 ? void 0 : user.photoUrl, name: user === null || user === void 0 ? void 0 : user.name });
        })))
            .then((newComment) => {
            return res.json({ comment: newComment });
        })
            .catch((e) => console.log(e));
    }),
    deleteComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    saveReaction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = Number(req.params.id);
            const userId = req.body.userId;
            const commentId = req.body.commentId;
            const reactionType = req.body.reactionType;
            const react = (yield Comment_1.default.findOne({
                _id: commentId,
            }));
            console.log(react, reactionType);
            if (react.reaction.length < 1) {
                Comment_1.default.updateOne({ _id: commentId }, { $push: { reaction: { userId, reactionType } } }).then((res) => console.log(res));
            }
            else {
                react.reaction.forEach((e) => {
                    if (e.userId === userId) {
                        if (e.reactionType === reactionType) {
                            Comment_1.default.updateOne({ _id: commentId }, { $pull: { reaction: { userId } } })
                                .then((res) => console.log(res))
                                .catch((e) => console.log(e));
                        }
                        else {
                            Comment_1.default.updateOne({ _id: commentId, "reaction.userId": userId }, { $set: { "reaction.$.reactionType": reactionType } })
                                .then((res) => console.log(res))
                                .catch((e) => console.log(e));
                        }
                    }
                    else {
                        Comment_1.default.updateOne({ _id: commentId }, { $push: { reaction: { userId, reactionType } } }).then((res) => console.log(res));
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.default = CommentController;
