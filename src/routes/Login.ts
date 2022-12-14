import express from "express";
import LoginController from "../controllers/LoginController";
const router = express.Router();
// router.get("/", LoginController.Middleware, LoginController.GetUserData);
router.post("/", LoginController.LogIn);
router.post("/signup", LoginController.Register);
router.post("/refreshtoken", LoginController.RefreshToken);
router.post("/signout", LoginController.LogOut);

export default router;
