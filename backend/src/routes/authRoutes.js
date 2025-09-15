import { Router } from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  uploadAvatar,
  register,
  login,
  me,
  googleLogin,
} from "../controllers/authController.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidators.js";
import validate from "../utils/validate.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/avatar", upload.single("image"), uploadAvatar);
router.post("/register", registerValidator(), validate, register);
router.post("/login", loginValidator(), validate, login);
router.get("/me", requiredAuth(), me);

router.get("/google", googleLogin);

export default router;
