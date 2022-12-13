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
const History_1 = __importDefault(require("../modal/History"));
const HistoryController = {
    saveHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const movieId = Number(req.params.id);
        const media = req.body.media;
        const userId = req.body.id;
        const movieWatched = yield History_1.default.findOne({ movieIds: movieId });
        const userWatched = yield History_1.default.findOne({ userId });
        console.log(movieId, media, movieWatched, userWatched);
        if (!userWatched) {
            const newHistory = new History_1.default({
                movieIds: [{ movieId, media }],
                userId,
            });
            newHistory.save();
            return res.json("add into history successfully!");
        }
        if (!(userWatched === null || userWatched === void 0 ? void 0 : userWatched.movieIds.some((movie) => movie.movieId === movieId)) &&
            Number.isInteger(movieId) &&
            userWatched) {
            yield History_1.default.updateOne({ userId: userWatched === null || userWatched === void 0 ? void 0 : userWatched.userId }, { $push: { movieIds: { movieId, media } } });
            return res.json("update history successfully!");
        }
        if (movieWatched && userWatched) {
            return res.json("update nothing!");
        }
        return res.json("add failed!");
    }),
    getHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const media = req.body.media;
        const movieWatched = yield History_1.default.findOne({
            userId,
        });
        const movieIds = movieWatched === null || movieWatched === void 0 ? void 0 : movieWatched.movieIds.filter((item) => item.media === media);
        return res.json({ movieIds: movieIds });
    }),
    deleteHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.body.userId;
            const movieIds = req.body.movieIds;
            const item = yield History_1.default.findOne({ userId });
            const newItem = item === null || item === void 0 ? void 0 : item.movieIds.filter((item) => !movieIds.includes(item.movieId));
            const removed = yield History_1.default.updateOne({ userId: userId }, { movieIds: newItem });
            return res.json("update history successfully!");
        }
        catch (error) {
            console.log(error);
            return res.json({ error });
        }
    }),
};
exports.default = HistoryController;
