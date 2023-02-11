import express from "express";
import LoginController from "../controllers/LoginController";
const router = express.Router();

router.post("/", LoginController.LogIn);
router.post("/signup", LoginController.Register);
router.post("/registerprovider", LoginController.RegisterProvider);

export default router;
