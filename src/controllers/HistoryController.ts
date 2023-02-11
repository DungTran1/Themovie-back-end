import History from "../modal/History";
import express from "express";

const HistoryController = {
  saveHistory: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = Number(req.params.id);
      const media: string = req.body.media;
      const uid: string = req.body.uid;
      const userWatched = await History.findOne({ uid });
      if (userWatched) {
        const isWatched = userWatched?.movieIds.some(
          (movie: any) => movie.movieId === movieId
        );
        if (isWatched) {
          return res.status(200).send("update history successfully!");
        } else {
          await History.updateOne(
            { uid: userWatched.uid },
            { $push: { movieIds: { movieId, media } } }
          );
          return res.status(200).send("update history successfully!");
        }
      }
      if (!userWatched) {
        new History({
          movieIds: [{ movieId, media }],
          uid,
        }).save();
        return res.status(200).send("add into history successfully!");
      }
      return;
    } catch (error) {
      console.log(error);
    }
  },
  getHistory: async (req: any, res: any) => {
    try {
      const uid = req.body.uid;
      const media = req.body.media;
      const movieWatched = await History.findOne({
        uid,
      });
      const movieIds = movieWatched?.movieIds.filter(
        (item) => item.media === media
      );
      if (movieIds) {
        return res.status(200).json({ movieIds: movieIds });
      }
      return;
    } catch (error) {
      console.log(error);
    }
  },
  deleteHistory: async (req: any, res: any) => {
    try {
      const uid = req.body.uid;
      const movieIds = req.body.movieIds;

      const item = await History.findOne({ uid });
      const newItem = item?.movieIds.filter(
        (item) => !movieIds.includes(item.movieId)
      );

      const removed = await History.updateOne({ uid }, { movieIds: newItem });
      if (removed) {
        return res.status(200).send("update history successfully!");
      }
      return;
    } catch (error) {
      console.log(error);
    }
  },
};
export default HistoryController;
