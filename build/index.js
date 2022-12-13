"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
};
(0, db_1.default)();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express_1.default.json());
(0, routes_1.default)(app);
const server = app.listen(5000, () => {
    console.log("listening on 5000");
});
