import { Router } from "express";
import {
  register,
  login,
  googleLogin,
  me,
  uploadAvatar,
} from "../controllers/authController.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidators.js";
import validate from "../utils/validate.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerValidator(), validate, register);
router.post("/login", loginValidator(), validate, login);
router.get("/google", googleLogin);
router.get("/me", requiredAuth(), me);
router.post("/avatar", upload.single("image"), uploadAvatar);

export default router;
