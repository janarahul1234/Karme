import { param, body, query } from "express-validator";
import {
  AvailableGoalCategories,
  AvailableGoalSortingTypes,
  AvailableGoalStatus,
} from "../constants.js";

export const queryGoalsValidator = () => {
  return [
    query("search")
      .optional()
      .isString()
      .trim()
      .withMessage("Search must be a string."),
    query("category")
      .optional()
      .isIn(AvailableGoalCategories)
      .withMessage(
        `Category must be one of: ${AvailableGoalCategories.join(", ")}.`
      ),
    query("status")
      .optional()
      .isIn(AvailableGoalStatus)
      .withMessage(`Status must be one of: ${AvailableGoalStatus.join(", ")}.`),
    query("sort")
      .optional()
      .isIn(AvailableGoalSortingTypes)
      .withMessage(
        `Sort field must be one of: ${AvailableGoalSortingTypes.join(", ")}.`
      ),
  ];
};

export const createGoalValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Goal name is required.")
      .isLength({ min: 3 })
      .withMessage("Goal name must be at lease 3 characters."),
    body("category")
      .isIn(AvailableGoalCategories)
      .withMessage(
        `Category must be one of: ${AvailableGoalCategories.join(", ")}.`
      ),
    body("targetDate")
      .isISO8601()
      .withMessage("Target date must be a valid date.")
      .custom((value) => {
        const inputTargetDate = new Date(value);
        const now = new Date();
        return inputTargetDate.getTime() > now.getTime();
      })
      .withMessage("Target date must be in the future."),
    body("targetAmount")
      .isNumeric()
      .withMessage("Target amount must be a number.")
      .custom((value) => value > 0)
      .withMessage("Target amount must be greater than 0."),
    body("savedAmount")
      .optional()
      .isNumeric()
      .withMessage("Target saved amount must be a number.")
      .custom((value) => value >= 0)
      .withMessage("Target saved amount must be equal or greater than 0."),
    body("imageUrl").isURL().withMessage("Image must be a valid URL."),
  ];
};

export const updateGoalValidator = () => {
  return [
    param("id").isMongoId().withMessage("Invalid goal ID."),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Goal name must be at lease 3 characters."),
    body("category")
      .optional()
      .isIn(AvailableGoalCategories)
      .withMessage(
        `Category must be one of: ${AvailableGoalCategories.join(", ")}.`
      ),
    body("targetDate")
      .optional()
      .isISO8601()
      .withMessage("Target date must be a valid date.")
      .custom((value) => {
        const inputTargetDate = new Date(value);
        const now = new Date();
        return inputTargetDate.getTime() > now.getTime();
      })
      .withMessage("Target date must be in the future."),
    body("targetAmount")
      .optional()
      .isNumeric()
      .withMessage("Target amount must be a number."),
    body("savedAmount")
      .optional()
      .isNumeric()
      .withMessage("Target saved amount must be a number.")
      .custom((value) => value >= 0)
      .withMessage("Target saved amount must be equal or greater than 0."),
    body("imageUrl")
      .optional()
      .isURL()
      .withMessage("Image must be a valid URL."),
  ];
};

export const addTransactionValidator = () => {
  return [
    param("id").isMongoId().withMessage("Invalid goal ID."),
    body("amount")
      .isNumeric()
      .withMessage("Amount must be a number.")
      .custom((value) => value > 0)
      .withMessage("Amount must be greater than 0."),
  ];
};
