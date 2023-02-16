import express, { Application } from "express";
import { Server } from "http";
import connect from "./config/db";
import appRoute from "./routes";
import * as dotenv from "dotenv";
dotenv.config();
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app: Application = express();

connect();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

appRoute(app);

const server: Server = app.listen(process.env.PORT, () => {
  console.log("Start on " + process.env.PORT);
});
