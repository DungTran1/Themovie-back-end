import History from "../modal/History";
import express from "express";
import jwt, { verify } from "jsonwebtoken";
import bycript from "bcrypt";

const HistoryController = {
  saveHistory: async (req: express.Request, res: express.Response) => {
    const movieId = Number(req.params.id);
    const media: string = req.body.media;
    const userId: string = req.body.id;
    const movieWatched = await History.findOne({ movieIds: movieId });
    const userWatched: any = await History.findOne({ userId });
    console.log(movieId, media, movieWatched, userWatched);
    if (!userWatched) {
      const newHistory = new History({
        movieIds: [{ movieId, media }],
        userId,
      });
      newHistory.save();
      return res.json("add into history successfully!");
    }
    if (
      !userWatched?.movieIds.some((movie: any) => movie.movieId === movieId) &&
      Number.isInteger(movieId) &&
      userWatched
    ) {
      await History.updateOne(
        { userId: userWatched?.userId },
        { $push: { movieIds: { movieId, media } } }
      );

      return res.json("update history successfully!");
    }
    if (movieWatched && userWatched) {
      return res.json("update nothing!");
    }
    return res.json("add failed!");
  },
  getHistory: async (req: any, res: any) => {
    const userId = req.body.userId;
    const media = req.body.media;
    const movieWatched = await History.findOne({
      userId,
    });
    const movieIds = movieWatched?.movieIds.filter(
      (item) => item.media === media
    );

    return res.json({ movieIds: movieIds });
  },
  deleteHistory: async (req: any, res: any) => {
    try {
      const userId = req.body.userId;
      const movieIds = req.body.movieIds;

      const item = await History.findOne({ userId });
      const newItem = item?.movieIds.filter(
        (item) => !movieIds.includes(item.movieId)
      );

      const removed = await History.updateOne(
        { userId: userId },
        { movieIds: newItem }
      );

      return res.json("update history successfully!");
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
};
export default HistoryController;
