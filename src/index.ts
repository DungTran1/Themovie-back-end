import express, { Application } from "express";
import { Server } from "http";
import connect from "./config/db";
import appRoute from "./routes";
import * as dotenv from "dotenv";
dotenv.config();
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app: Application = express();
const corsOptions = {
  origin: process.env.PRODUCT_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};
connect();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
appRoute(app);

const server: Server = app.listen(5000, () => {
  console.log("Start on " + 5000);
});
