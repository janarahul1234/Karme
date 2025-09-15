import mongoose from "mongoose";
import { AvailableTransactionTypes } from "../constants.js";

const transactionSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: AvailableTransactionTypes,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
