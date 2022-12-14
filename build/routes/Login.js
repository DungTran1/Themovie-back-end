"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const router = express_1.default.Router();
// router.get("/", LoginController.Middleware, LoginController.GetUserData);
router.post("/", LoginController_1.default.LogIn);
router.post("/signup", LoginController_1.default.Register);
router.post("/refreshtoken", LoginController_1.default.RefreshToken);
router.post("/signout", LoginController_1.default.LogOut);
exports.default = router;
