import Account from "../modal/Account";
import Comment from "../modal/Comment";
import express from "express";
import jwt, { verify } from "jsonwebtoken";
import bycript from "bcrypt";

const LoginController = {
  Test: async (req: any, res: any) => {
    const test = await Comment.deleteMany({
      movieId: 76600,
    });
    return res.json(test);
  },
  // generateAccessToken: (user: any) => {
  //   return jwt.sign(
  //     {
  //       id: user.id,
  //     },
  //     "secretAccessToken",
  //     { expiresIn: "30s" }
  //   );
  // },
  // generateRefreshToken: (user: any) => {
  //   return jwt.sign(
  //     {
  //       id: user.id,
  //     },
  //     "secretRefreshToken",
  //     { expiresIn: "365d" }
  //   );
  // },
  // RefreshToken: async (req: express.Request | any, res: express.Response) => {
  //   const refreshToken = req.cookies.refreshToken;
  //   console.log(refreshToken);
  //   //Send error if token is not valid
  //   if (!refreshToken) return res.status(401).json("You're not authenticated");
  //   jwt.verify(refreshToken, "secretAccessToken", (err: any, user: any) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     //create new access token, refresh token and send to user
  //     const newAccessToken = LoginController.generateAccessToken(user);
  //     const newRefreshToken = LoginController.generateRefreshToken(user);
  //     res.cookie("refreshToken", newRefreshToken, {
  //       httpOnly: true,
  //       secure: false,
  //       sameSite: "strict",
  //     });
  //     res.status(200).json({
  //       accessToken: newAccessToken,
  //     });
  //   });
  // },

  LogIn: async (req: express.Request, res: express.Response) => {
    try {
      const user: any = await Account.findOne({ email: req.body.email });

      if (!user) {
        res.status(404).json("User is not exsist!");
      }
      const validPassword = await bycript.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password");
      }
      if (user && validPassword) {
        // const accessToken = LoginController.generateAccessToken(user);
        // const refreshToken = LoginController.generateRefreshToken(user);

        const { password, ...other } = user._doc;
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        //   sameSite: "strict",
        // });
        res.status(200).json({ ...other });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  Register: async (req: express.Request, res: express.Response) => {
    try {
      const data = req.body;
      const user = new Account({
        uid: data.uid,
        displayName: data.displayName,
        photoUrl: data.photoUrl,
      }) as any;
      await user.save();
      return res.send(true);
    } catch (error) {
      console.log(error);
    }
  },
  RegisterProvider: async (req: express.Request, res: express.Response) => {
    try {
      const data = req.body;
      const check = (await Account.findOne({
        email: data.email,
      })) as any;

      if (!check) {
        // const salt = await bycript.genSalt(10);
        // const hash = await bycript.hash(data.password, salt);
        const user = new Account({
          uid: data.uid,
          firstname: data.firstName,
          password: data.password,
          email: data.email,
          photoUrl: data.photoUrl || "",
        }) as any;
        await user.save();
        // const accessToken = LoginController.generateAccessToken(user._doc);
        // const refreshToken = LoginController.generateRefreshToken(user._doc);
        const { password, ...others } = user._doc;
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        //   sameSite: "strict",
        // });
        return res.send({ isSignIn: true, ...others });
      }

      const { password, ...others } = check._doc;
      res.send({
        isSignIn: true,
        ...others,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  // LogOut: async (req: express.Request, res: express.Response) => {
  //   res.clearCookie("refreshToken");

  //   res.status(200).json("Logged out successfully!");
  // },
};
export default LoginController;
