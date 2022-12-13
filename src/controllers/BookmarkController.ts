import Bookmark from "../modal/Bookmark";
import express from "express";
import jwt, { verify } from "jsonwebtoken";
import bycript from "bcrypt";

const BookmarkController = {
  saveBookmark: async (req: any, res: any) => {
    const movieId = Number(req.params.id);
    const media = req.body.media;
    const userId = req.body.id;
    // const movieWatched = await Bookmark.findOne({
    //   "movieIds.movieId": movieId,
    // });
    const userWatched: any = await Bookmark.findOne({ userId });
    // console.log(movieId, media, movieWatched, userWatched);
    if (!userWatched) {
      const newBookmark = new Bookmark({
        movieIds: [{ movieId, media }],
        userId,
      });
      newBookmark.save();
      return res.json("add into Bookmark successfully!");
    } else {
      if (
        !userWatched?.movieIds.some((movie: any) => movie.movieId === movieId)
      ) {
        await Bookmark.updateOne(
          { userId: userWatched?.userId },
          { $push: { movieIds: { movieId, media } } }
        );
        return res.json("update Bookmark successfully!");
      } else {
        await Bookmark.updateOne(
          { userId },
          { $pull: { movieIds: { movieId } } }
        );
        return res.json("Remove successfully!");
      }
    }
  },
  getBookmark: async (req: any, res: any) => {
    const userId = req.body.userId;
    const media = req.body.media;
    const movieWatched = await Bookmark.findOne({
      userId,
    });
    const movieIds = movieWatched?.movieIds.filter(
      (item) => item.media === media
    );
    return res.json({ movieIds: movieIds });
  },
  deleteBookmark: async (req: any, res: any) => {
    try {
      const userId = req.body.userId;
      const movieIds = req.body.movieIds;

      const item = await Bookmark.findOne({ userId });
      const newItem = item?.movieIds.filter(
        (item) => !movieIds.includes(item.movieId)
      );

      const removed = await Bookmark.updateOne(
        { userId: userId },
        { movieIds: newItem }
      );

      return res.json("update Bookmark successfully!");
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
};
export default BookmarkController;
