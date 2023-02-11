import express from "express";
import Personal from "../controllers/PersonalController";
const router = express.Router();

router.post("/uploadProfile", Personal.UploadProfile);
router.post("/displayNameChange", Personal.DisplayNameChange);
router.post("/deleteAccount", Personal.DeleteAccount);

export default router;
