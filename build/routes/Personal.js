"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PersonalController_1 = __importDefault(require("../controllers/PersonalController"));
const router = express_1.default.Router();
router.post("/uploadProfile", PersonalController_1.default.UploadProfile);
router.post("/displayNameChange", PersonalController_1.default.DisplayNameChange);
router.post("/deleteAccount", PersonalController_1.default.DeleteAccount);
exports.default = router;
