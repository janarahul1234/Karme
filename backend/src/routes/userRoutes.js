import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { updateUserValidator } from "../validators/userValidators.js";
import validate from "../utils/validate.js";
import requiredAuth from "../middlewares/authMiddleware.js";
import { UserRoles } from "../constants.js";

const router = Router();

router.get("/", requiredAuth([UserRoles.ADMIN]), getUsers);
router
  .route("/:id")
  .get(requiredAuth([UserRoles.ADMIN]), getUser)
  .put(requiredAuth(), updateUserValidator(), validate, updateUser)
  .delete(requiredAuth([UserRoles.ADMIN]), deleteUser);

export default router;
