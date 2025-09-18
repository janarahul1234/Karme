import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Goal } from "../models/Goal.js";
import { Transaction } from "../models/Transaction.js";
import { GoalStatus, TransactionTypes } from "../constants.js";
import calculateProgress from "../utils/calculateProgress.js";

/**
 * @desc    Get dashboard data
 * @route   GET /api/dashboard
 * @access  protected
 */
export const getDashboard = asyncHandler(async (req, res) => {
  // Get active goals, net income, total saved and overall progress
  const userId = req.user._id;

  const activeGoals = await Goal.find({
    userId,
    status: GoalStatus.ACTIVE,
  });

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
  const totalSaved = activeGoals.reduce(
    (acc, g) => acc + (g.savedAmount || 0),
    0
  );
  const totalTarget = activeGoals.reduce(
    (acc, g) => acc + (g.targetAmount || 0),
    0
  );
  const overallProgress =
    totalTarget > 0 ? calculateProgress(totalTarget, totalSaved) : 0;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        activeGoals: activeGoals.length,
        netIncome,
        totalSaved,
        overallProgress,
      },
      "Dashboard data fetched successfully."
    )
  );
});
