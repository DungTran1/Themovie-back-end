"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class MiddlewareController {
    Middleware(req, res, next) {
        try {
            const token = req.headers.authorization;
            if (token) {
                const accessToken = token.split(" ");
                (0, jsonwebtoken_1.verify)(accessToken[1], "secret", (err, data) => {
                    if (err) {
                        console.log("token is not valid");
                        res.status(404).json("token is not valid");
                    }
                    req.user = data;
                    next();
                });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
exports.default = new MiddlewareController();
