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
        try {
            const movieId = Number(req.params.id);
            const media = req.body.media;
            const uid = req.body.uid;
            const userWatched = yield History_1.default.findOne({ uid });
            if (userWatched && movieId && uid && media) {
                const isWatched = userWatched === null || userWatched === void 0 ? void 0 : userWatched.movieIds.some((movie) => movie.movieId === movieId);
                if (isWatched) {
                    return res.status(200).json("update history successfully!");
                }
                else {
                    yield History_1.default.updateOne({ uid: userWatched.uid }, { $push: { movieIds: { movieId, media } } });
                    return res.status(200).json("update history successfully!");
                }
            }
            if (!userWatched && movieId && uid && media) {
                new History_1.default({
                    movieIds: [{ movieId, media }],
                    uid,
                }).save();
                return res.status(200).json("add into history successfully!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const media = req.body.media;
            const movieWatched = yield History_1.default.findOne({
                uid,
            });
            const movieIds = movieWatched === null || movieWatched === void 0 ? void 0 : movieWatched.movieIds.filter((item) => item.media === media);
            return res.status(200).json({ movieIds: movieIds });
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uid = req.body.uid;
            const movieIds = req.body.movieIds;
            const item = yield History_1.default.findOne({ uid });
            const newItem = item === null || item === void 0 ? void 0 : item.movieIds.filter((item) => !movieIds.includes(item.movieId));
            const removed = yield History_1.default.updateOne({ uid }, { movieIds: newItem });
            if (removed) {
                return res.status(200).send("update history successfully!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.default = HistoryController;
