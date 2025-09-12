import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Goal } from "../models/Goal.js";
import { Transaction } from "../models/Transaction.js";
import { GoalStatus, TransactionTypes } from "../constants.js";

/**
 * @desc    Get all transaction
 * @route   GET /api/transactions
 * @access  protected
 */
export const getTransactions = asyncHandler(async (req, res) => {
  const { type, category, sort } = req.query;

  let query = { userId: req.user._id };

  if (type) query.type = type;
  if (category) query.type = category;

  const transactions = await Transaction.find(query).sort(
    sort ? { [sort]: -1 } : { createdAt: -1 }
  );

  res
    .status(200)
    .json(new ApiResponse(200, transactions, "Transactions get successfully."));
});

/**
 * @desc    Get transaction
 * @route   GET /api/transactions/:id
 * @access  protected
 */
export const getTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction get successfully."));
});

/**
 * @desc    Create transaction
 * @route   POST /api/transactions
 * @access  protected
 */
export const createTransaction = asyncHandler(async (req, res) => {
  const { title, category, type, amount, date } = req.body;

  const transaction = await Transaction.create({
    title,
    category,
    type,
    amount,
    date,
    userId: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, transaction, "Transaction added successfully."));
});

/**
 * @desc    Update transaction
 * @route   PUT /api/transactions/:id
 * @access  protected
 */
export const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, type, amount, date } = req.body;

  const transaction = await Transaction.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found.");
  }

  transaction.title = title ?? transaction.title;
  transaction.category = category ?? transaction.category;
  transaction.type = type ?? transaction.type;
  transaction.amount = amount ?? transaction.amount;
  transaction.date = date ?? transaction.date;
  await transaction.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction updated successfully.")
    );
});

/**
 * @desc    Delete transaction
 * @route   DELETE /api/transactions/:id
 * @access  protected
 */
export const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction deleted successfully.")
    );
});
