import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Transaction } from "../models/Transaction.js";
import { TransactionTypes } from "../constants.js";

/**
 * @desc    Get finance data
 * @route   GET /api/finances
 * @access  protected
 */
export const getFinance = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions?.forEach((t) => {
    if (t.type === TransactionTypes.INCOME) {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  });

  const netIncome = totalIncome - totalExpenses;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalIncome, totalExpenses, netIncome, transactions },
        "Finance data fetched successfully."
      )
    );
});
