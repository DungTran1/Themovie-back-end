import express, { Application } from "express";
import loginRouter from "./Login";
import historyRouter from "./History";
import bookmarkRouter from "./Bookmark";
import commentRouter from "./Comment";
import PersonalRouter from "./Personal";

const app = (app: Application): void => {
  app.use("/auth", loginRouter);
  app.use("/history", historyRouter);
  app.use("/bookmark", bookmarkRouter);
  app.use("/comment", commentRouter);
  app.use("/personal", PersonalRouter);
};
export default app;
