import Bookmark from "../modal/Bookmark";
import express from "express";
const BookmarkController = {
  saveBookmark: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = Number(req.params.id);
      const media = req.body.media;
      const uid = req.body.uid;
      const userWatched = await Bookmark.findOne({ uid });
      if (userWatched) {
        const isWatched = userWatched?.movieIds.some(
          (movie) => movie.movieId === movieId
        );
        if (!isWatched) {
          await Bookmark.updateOne(
            { uid },
            {
              $push: { movieIds: { movieId, media } },
            }
          ).then(() => res.status(200).send("add Bookmark successfully!"));
        } else {
          await Bookmark.updateOne(
            { uid: uid },
            { $pull: { movieIds: { movieId: movieId } } }
          ).then(() => res.status(200).send("remove Bookmark successfully!"));
        }
      } else {
        new Bookmark({
          movieIds: [{ movieId, media }],
          uid,
        })
          .save()
          .then(() => res.status(200).send("add Bookmark successfully!"));
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkBookmark: async (req: express.Request, res: express.Response) => {
    try {
      const movieId = Number(req.params.id);
      const uid = req.body.uid;

      const bookmark = await Bookmark.findOne({
        uid,
      });
      const isCheck = bookmark?.movieIds?.some(
        (bookmark: any) => bookmark.movieId === movieId
      );
      if (isCheck) {
        return res.status(200).send(true);
      } else {
        return res.status(200).send(false);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getBookmark: async (req: any, res: any) => {
    try {
      const uid = req.body.uid;
      const media = req.body.media;
      const movieWatched = await Bookmark.findOne({
        uid,
      });
      const movieIds = movieWatched?.movieIds.filter(
        (item) => item.media === media
      );
      return res.status(200).json({ movieIds: movieIds });
    } catch (error) {
      console.log(error);
    }
  },
  deleteBookmark: async (req: any, res: any) => {
    try {
      const uid = req.body.uid;
      const movieIds = req.body.movieIds;

      const item = await Bookmark.findOne({ uid });
      const newItem = item?.movieIds.filter(
        (item) => !movieIds.includes(item.movieId)
      );

      const removed = await Bookmark.updateOne(
        { uid: uid },
        { movieIds: newItem }
      );
      if (removed) {
        return res.status(200).send("update Bookmark successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default BookmarkController;
