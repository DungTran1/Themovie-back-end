import express from "express";
import Account from "../modal/Account";
import jwt, { verify } from "jsonwebtoken";
import bycript from "bcrypt";
class MiddlewareController {
  Middleware(
    req: express.Request | any,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = req.headers.authorization;
      if (token) {
        const accessToken = token.split(" ");

        verify(accessToken[1], "secret", (err: any, data: any) => {
          if (err) {
            console.log("token is not valid");
            res.status(404).json("token is not valid");
          }

          req.user = data;
          next();
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default new MiddlewareController();
