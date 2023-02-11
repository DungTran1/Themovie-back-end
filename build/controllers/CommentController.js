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
const CommentController = {
    addComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = Number(req.params.id);
            const uid = req.body.uid;
            const content = req.body.content;
            const comments = req.body.comments;
            const displayName = req.body.displayName;
            const photoURL = req.body.photoURL;
            const newComment = new Comment_1.default({
                movieId,
                uid,
                displayName,
                content,
                comments,
                photoURL,
            });
            yield newComment.save();
            const findComemnt = yield Comment_1.default.findOne({}, {}, { sort: { createdAt: -1 } });
            return res.send(200).json({
                comment: findComemnt,
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = req.body.movieId;
            const comment = yield Comment_1.default.find({ movieId }).sort({
                createdAt: -1,
            });
            if (JSON.stringify(comment) === "[]") {
                return res.status(200).json(null);
            }
            return res.status(200).json({ comment: comment });
        }
        catch (error) {
            console.log(error);
        }
    }),
    editComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const edit = yield Comment_1.default.findByIdAndUpdate(req.body._id, {
                content: req.body.content,
            });
            if (edit) {
                res.status(200).send(true);
            }
        }
        catch (error) { }
    }),
    removeComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _id = req.body._id;
            const remove = yield Comment_1.default.findByIdAndDelete(_id);
            if (remove) {
                return res.status(200).send(true);
            }
            return res.status(200).send(false);
        }
        catch (error) {
            console.log(error);
        }
    }),
    saveReaction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const uid = req.body.uid;
            const commentId = req.body.commentId;
            const displayName = req.body.displayName;
            const photoURL = req.body.photoURL;
            const type = req.body.type;
            const react = (yield Comment_1.default.findOne({
                _id: commentId,
            }));
            const userReacted = (_a = react === null || react === void 0 ? void 0 : react.reaction) === null || _a === void 0 ? void 0 : _a.find((e) => e.uid === uid);
            if (userReacted) {
                const typeReacted = react.reaction.find((e) => e.type === type && e.uid === uid);
                if (typeReacted) {
                    Comment_1.default.updateOne({ _id: commentId }, { $pull: { reaction: { uid } } })
                        .then(() => res.status(200).send(true))
                        .catch((e) => console.log(e));
                }
                else {
                    Comment_1.default.updateOne({ _id: commentId, "reaction.uid": uid }, { $set: { "reaction.$.type": type } })
                        .then(() => res.status(200).send(true))
                        .catch((e) => console.log(e));
                }
            }
            else {
                Comment_1.default.updateOne({ _id: commentId }, { $push: { reaction: { uid, type, displayName, photoURL } } }).then(() => res.status(200).send(true));
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.default = CommentController;
