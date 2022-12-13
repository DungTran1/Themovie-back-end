import express, { Application, NextFunction, Request, Response } from "express";
import { Server } from "http";
import connect from "./config/db";
import appRoute from "./routes";
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app: Application = express();
const corsOptions = {
  origin: "https://themovie.onrender.com/",
  optionsSuccessStatus: 200,
  credentials: true,
};
connect();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.json());
appRoute(app);

const server: Server = app.listen("https://themovie.onrender.com", () => {
  console.log("listening on 5000");
});
