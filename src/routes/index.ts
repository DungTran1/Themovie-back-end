import { Application } from "express";
import historyRouter from "./History";
import bookmarkRouter from "./Bookmark";
import commentRouter from "./Comment";

const app = (app: Application): void => {
  app.use("/history", historyRouter);
  app.use("/bookmark", bookmarkRouter);
  app.use("/comment", commentRouter);
};
export default app;
