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
const Bookmark_1 = __importDefault(require("../modal/Bookmark"));
const BookmarkController = {
    saveBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieId = Number(req.params.id);
            const media = req.body.media;
            const uid = req.body.uid;
            const userWatched = yield Bookmark_1.default.findOne({ uid });
            if (userWatched) {
                const isWatched = userWatched === null || userWatched === void 0 ? void 0 : userWatched.movieIds.some((movie) => movie.movieId === movieId);
                if (!isWatched) {
                    yield Bookmark_1.default.updateOne({ uid }, {
                        $push: { movieIds: { movieId, media } },
                    });
                    return res.status(200).send("update nothing!");
                }
                else {
                    yield Bookmark_1.default.updateOne({ uid: uid }, { $pull: { movieIds: { movieId: movieId } } });
                    return res.status(200).send("update Bookmark successfully!");
                }
            }
            if (!userWatched) {
                new Bookmark_1.default({
                    movieIds: [{ movieId, media }],
                    uid,
                }).save();
                return res.json("add into Bookmark successfully!");
            }
            return res.status(200).send("add failed!");
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }),
    checkBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const movieId = Number(req.params.id);
            const uid = req.body.uid;
            const bookmark = yield Bookmark_1.default.findOne({
                uid,
            });
            const isCheck = (_a = bookmark === null || bookmark === void 0 ? void 0 : bookmark.movieIds) === null || _a === void 0 ? void 0 : _a.some((bookmark) => bookmark.movieId === movieId);
            if (isCheck) {
                res.status(200).send(true);
            }
            res.status(200).send(false);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const media = req.body.media;
            const movieWatched = yield Bookmark_1.default.findOne({
                uid,
            });
            const movieIds = movieWatched === null || movieWatched === void 0 ? void 0 : movieWatched.movieIds.filter((item) => item.media === media);
            return res.status(200).json({ movieIds: movieIds });
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const movieIds = req.body.movieIds;
            const item = yield Bookmark_1.default.findOne({ uid });
            const newItem = item === null || item === void 0 ? void 0 : item.movieIds.filter((item) => !movieIds.includes(item.movieId));
            const removed = yield Bookmark_1.default.updateOne({ uid: uid }, { movieIds: newItem });
            if (removed) {
                return res.status(200).send("update Bookmark successfully!");
            }
            return res.status(200).send("failure");
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }),
};
exports.default = BookmarkController;
