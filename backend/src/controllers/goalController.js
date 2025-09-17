import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Goal } from "../models/Goal.js";
import { Transaction } from "../models/Transaction.js";
import { GoalStatus, TransactionTypes } from "../constants.js";
import calculateProgress from "../utils/calculateProgress.js";

/**
 * @desc    Get all goal
 * @route   GET /api/goals
 * @access  protected
 */
export const getGoals = asyncHandler(async (req, res) => {
  const { search, category, status, sort } = req.query;

  const query = { userId: req.user._id };

  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (status) query.status = status;

  const goals = await Goal.find(query).sort(
    sort ? { [sort]: 1 } : { createdAt: -1 }
  );

  res.status(200).json(new ApiResponse(200, goals, "Goals get successfully."));
});

/**
 * @desc    Get goal
 * @route   GET /api/goals/:id
 * @access  protected
 */
export const getGoalById = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id });

  if (!goal) {
    throw new ApiError(404, "Goal not found.");
  }

  res.status(200).json(new ApiResponse(200, goal, "Goal get successfully."));
});

/**
 * @desc    Create goal
 * @route   POST /api/goals
 * @access  protected
 */
export const createGoal = asyncHandler(async (req, res) => {
  const { name, category, targetDate, targetAmount, savedAmount, imageUrl } =
    req.body;

  const goal = await Goal.create({
    name,
    category,
    targetDate,
    targetAmount,
    savedAmount,
    progress: calculateProgress(targetAmount, savedAmount),
    imageUrl,
    userId: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, goal, "Goal added successfully."));
});

/**
 * @desc    Update goal
 * @route   PUT /api/goals/:id
 * @access  protected
 */
export const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, targetDate, targetAmount, savedAmount, imageUrl } =
    req.body;

  const goal = await Goal.findOne({ _id: id, userId: req.user._id });
  if (!goal) {
    throw new ApiError(404, "Goal not found.");
  }

  goal.name = name ?? goal.name;
  goal.category = category ?? goal.category;
  goal.targetDate = targetDate ?? goal.targetDate;
  goal.targetAmount = targetAmount ?? goal.targetAmount;
  goal.savedAmount = savedAmount ?? goal.savedAmount;
  goal.progress = calculateProgress(goal.targetAmount, goal.savedAmount);
  goal.imageUrl = imageUrl ?? goal.imageUrl;
  await goal.save();

  res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal updated successfully."));
});

/**
 * @desc    Delete goal
 * @route   DELETE /api/goals/:id
 * @access  protected
 */
export const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const goal = await Goal.findOneAndDelete({ _id: id, userId: req.user._id });
  if (!goal) {
    throw new ApiError(404, "Goal not found.");
  }

  await Transaction.deleteMany({ goalId: id, userId: req.user._id });

  res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal deleted successfully."));
});

/**
 * @desc    Add goal transaction
 * @route   POST /api/goals/:id/transactions
 * @access  protected
 */
export const addTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const goal = await Goal.findOne({ _id: id, userId: req.user._id });
  if (!goal) {
    throw new ApiError(404, "Goal not found.");
  }

  if (goal.status === GoalStatus.COMPLETED) {
    throw new ApiError(400, "Goal is already completed.");
  }

  const remaining = goal.targetAmount - goal.savedAmount;
  const appliedAmount = Math.min(amount, remaining);

  goal.savedAmount += amount;
  goal.progress = calculateProgress(goal.targetAmount, goal.savedAmount);

  if (goal.savedAmount >= goal.targetAmount) {
    goal.savedAmount = goal.targetAmount;
    goal.status = GoalStatus.COMPLETED;
  }

  await goal.save();

  await Transaction.create({
    category: goal.category,
    type: TransactionTypes.SAVING,
    amount: appliedAmount,
    goalId: id,
    description: `Goal: ${goal.name}`,
    userId: req.user._id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal transaction added successfully."));
});
