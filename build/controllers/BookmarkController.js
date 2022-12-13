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
        const movieId = Number(req.params.id);
        const media = req.body.media;
        const userId = req.body.id;
        // const movieWatched = await Bookmark.findOne({
        //   "movieIds.movieId": movieId,
        // });
        const userWatched = yield Bookmark_1.default.findOne({ userId });
        // console.log(movieId, media, movieWatched, userWatched);
        if (!userWatched) {
            const newBookmark = new Bookmark_1.default({
                movieIds: [{ movieId, media }],
                userId,
            });
            newBookmark.save();
            return res.json("add into Bookmark successfully!");
        }
        else {
            if (!(userWatched === null || userWatched === void 0 ? void 0 : userWatched.movieIds.some((movie) => movie.movieId === movieId))) {
                yield Bookmark_1.default.updateOne({ userId: userWatched === null || userWatched === void 0 ? void 0 : userWatched.userId }, { $push: { movieIds: { movieId, media } } });
                return res.json("update Bookmark successfully!");
            }
            else {
                yield Bookmark_1.default.updateOne({ userId }, { $pull: { movieIds: { movieId } } });
                return res.json("Remove successfully!");
            }
        }
    }),
    getBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const media = req.body.media;
        const movieWatched = yield Bookmark_1.default.findOne({
            userId,
        });
        const movieIds = movieWatched === null || movieWatched === void 0 ? void 0 : movieWatched.movieIds.filter((item) => item.media === media);
        return res.json({ movieIds: movieIds });
    }),
    deleteBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.body.userId;
            const movieIds = req.body.movieIds;
            const item = yield Bookmark_1.default.findOne({ userId });
            const newItem = item === null || item === void 0 ? void 0 : item.movieIds.filter((item) => !movieIds.includes(item.movieId));
            const removed = yield Bookmark_1.default.updateOne({ userId: userId }, { movieIds: newItem });
            return res.json("update Bookmark successfully!");
        }
        catch (error) {
            console.log(error);
            return res.json({ error });
        }
    }),
};
exports.default = BookmarkController;
