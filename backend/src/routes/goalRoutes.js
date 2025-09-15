import { Router } from "express";
import {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  addTransaction,
} from "../controllers/goalController.js";
import {
  queryGoalsValidator,
  createGoalValidator,
  updateGoalValidator,
  addTransactionValidator,
} from "../validators/goalValidators.js";
import validate from "../utils/validate.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requiredAuth());

router
  .route("/")
  .get(queryGoalsValidator(), validate, getGoals)
  .post(createGoalValidator(), validate, createGoal);
router
  .route("/:id")
  .get(getGoalById)
  .put(updateGoalValidator(), validate, updateGoal)
  .delete(deleteGoal);

router
  .route("/:id/transactions")
  .post(addTransactionValidator(), validate, addTransaction);

export default router;
