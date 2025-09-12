import mongoose from "mongoose";
import {
  AvailableGoalCategories,
  GoalStatus,
  AvailableGoalStatus,
} from "../constants.js";

const goalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: AvailableGoalCategories,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    savedAmount: {
      type: Number,
      default: 0,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: AvailableGoalStatus,
      default: GoalStatus.ACTIVE,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Goal = mongoose.model("Goal", goalSchema);
