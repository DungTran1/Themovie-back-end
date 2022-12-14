"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("../modal/Account"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LoginController = {
    Test: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield Account_1.default.findOne({
            name: "DungTran",
            email: "lssktt@gmail.com",
        });
        return res.json(test);
    }),
    generateAccessToken: (user) => {
        return jsonwebtoken_1.default.sign({
            id: user.id,
        }, "secretAccessToken", { expiresIn: "30s" });
    },
    generateRefreshToken: (user) => {
        return jsonwebtoken_1.default.sign({
            id: user.id,
        }, "secretRefreshToken", { expiresIn: "365d" });
    },
    RefreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);
        //Send error if token is not valid
        if (!refreshToken)
            return res.status(401).json("You're not authenticated");
        jsonwebtoken_1.default.verify(refreshToken, "secretAccessToken", (err, user) => {
            if (err) {
                console.log(err);
            }
            //create new access token, refresh token and send to user
            const newAccessToken = LoginController.generateAccessToken(user);
            const newRefreshToken = LoginController.generateRefreshToken(user);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
            });
        });
    }),
    LogIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield Account_1.default.findOne({ name: req.body.name });
            if (!user) {
                res.status(404).json("wrong user!");
            }
            const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).json("Wrong password");
            }
            console.log(!!user, !!validPassword);
            if (user && validPassword) {
                const accessToken = LoginController.generateAccessToken(user);
                const refreshToken = LoginController.generateRefreshToken(user);
                const _a = user._doc, { password } = _a, other = __rest(_a, ["password"]);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                res.status(200).json(Object.assign(Object.assign({}, other), { accessToken }));
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    Register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const check = yield Account_1.default.findOne({
                name: data.name,
                email: data.email,
            });
            if (!check) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(data.password, salt);
                const account = new Account_1.default({
                    name: data.name,
                    password: hash,
                    email: data.email,
                    address: "",
                    birthday: "",
                });
                account.save();
                return res.send({ path: "/" });
            }
            res.send({ path: "Tai khoan da ton tai" });
        }
        catch (error) { }
    }),
    LogOut: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    }),
};
exports.default = LoginController;
