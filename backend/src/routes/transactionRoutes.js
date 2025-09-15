import { Router } from "express";
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import {
  queryTransactionValiator,
  createTransactionValidator,
  updateTransactionValidator,
} from "../validators/transactionValidators.js";
import validate from "../utils/validate.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requiredAuth());

router
  .route("/")
  .get(queryTransactionValiator(), validate, getTransactions)
  .post(createTransactionValidator(), validate, createTransaction);
router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransactionValidator(), validate, updateTransaction)
  .delete(deleteTransaction);

export default router;
