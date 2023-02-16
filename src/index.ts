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
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
connect();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
appRoute(app);

const server: Server = app.listen(process.env.PORT, () => {
  console.log("Start on " + process.env.PORT);
});
