import { Router } from "express";
import {
  getGoals,
  getGoal,
  createGoal,
  addSavings,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";
import {
  getGoalValidator,
  createGoalValidator,
  addSavingsValidator,
  updateGoalValidator,
} from "../validators/goalValidators.js";
import validate from "../utils/validate.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requiredAuth());
router
  .route("/")
  .get(getGoalValidator(), validate, getGoals)
  .post(createGoalValidator(), validate, createGoal);
router
  .route("/:id")
  .get(getGoal)
  .put(updateGoalValidator(), validate, updateGoal)
  .delete(deleteGoal);
router.route("/:id/savings").post(addSavingsValidator(), validate, addSavings);

export default router;
