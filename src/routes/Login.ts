import express, { Application } from "express";
import LoginController from "../controllers/LoginController";
const router = express.Router();
// router.get("/", LoginController.Middleware, LoginController.GetUserData);
router.post("/", LoginController.LogIn);
router.get("/test", LoginController.Test);
router.post("/signup", LoginController.Register);
router.post("/registerprovider", LoginController.RegisterProvider);
// router.post("/refreshtoken", LoginController.RefreshToken);
// router.post("/signout", LoginController.LogOut);

export default router;
