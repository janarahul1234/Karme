import { param, query, body } from "express-validator";
import {
  AvailableIncomeCaregories,
  AvailableExpenseCategories,
  TransactionTypes,
  AvailableTransactionTypes,
  AvailableTransactionSortTypes,
} from "../constants.js";

const AvailableTransactionTypesExcerptSaving = AvailableTransactionTypes.filter(
  (item) => item !== TransactionTypes.SAVING
);

export const queryTransactionValiator = () => {
  return [
    query("type")
      .optional()
      .isIn(AvailableTransactionTypesExcerptSaving)
      .withMessage(
        `Type must be one of: ${AvailableTransactionTypesExcerptSaving.join(
          ", "
        )}.`
      ),
    query("category")
      .optional()
      .custom((value, { req }) => {
        if (
          req.query.type === "income" &&
          !AvailableIncomeCaregories.includes(value)
        ) {
          throw new Error(
            `Income category must be one of: ${AvailableIncomeCaregories.join(
              ", "
            )}.`
          );
        }
        if (
          req.query.type === "expense" &&
          !AvailableExpenseCategories.includes(value)
        ) {
          throw new Error(
            `Expense category must be one of: ${AvailableExpenseCategories.join(
              ", "
            )}.`
          );
        }
        return true;
      }),
    query("sort")
      .optional()
      .isIn(AvailableTransactionSortTypes)
      .withMessage(
        `Sort field be one of: ${AvailableTransactionSortTypes.join(", ")}.`
      ),
  ];
};

export const createTransactionValidator = () => {
  return [
    body("type")
      .isIn(AvailableTransactionTypesExcerptSaving)
      .withMessage(
        `Type must be one of: ${AvailableTransactionTypesExcerptSaving.join(
          ", "
        )}.`
      ),
    body("category")
      .notEmpty()
      .withMessage("Category is required.")
      .custom((value, { req }) => {
        if (
          req.body.type === TransactionTypes.INCOME &&
          !AvailableIncomeCaregories.includes(value)
        ) {
          throw new Error(
            `Income category must be one of: ${AvailableIncomeCaregories.join(
              ", "
            )}.`
          );
        }
        if (
          req.body.type === TransactionTypes.EXPENSE &&
          !AvailableExpenseCategories.includes(value)
        ) {
          throw new Error(
            `Expense category must be one of: ${AvailableExpenseCategories.join(
              ", "
            )}.`
          );
        }
        return true;
      }),
    body("amount")
      .isNumeric()
      .withMessage("Amount must be a number.")
      .custom((value) => value > 0)
      .withMessage("Amount must be greater than 0."),
    body("date")
      .isISO8601()
      .withMessage("Date must be a valid date.")
      .custom((value) => {
        const inputDate = new Date(value);
        const now = new Date();
        return inputDate.getTime() <= now.getTime();
      })
      .withMessage("Date must be in the past or today."),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("transaction description must be at lease 3 characters."),
  ];
};

export const updateTransactionValidator = () => {
  return [
    param("id").isMongoId().withMessage("Invalid transaction ID."),
    body("type")
      .optional()
      .isIn(AvailableTransactionTypesExcerptSaving)
      .withMessage(
        `Type must be one of: ${AvailableTransactionTypesExcerptSaving.join(
          ", "
        )}.`
      ),
    body("category")
      .optional()
      .custom((value, { req }) => {
        if (
          req.body.type === "income" &&
          !AvailableIncomeCaregories.includes(value)
        ) {
          throw new Error(
            `Income category must be one of: ${AvailableIncomeCaregories.join(
              ", "
            )}.`
          );
        }
        if (
          req.body.type === "expense" &&
          !AvailableExpenseCategories.includes(value)
        ) {
          throw new Error(
            `Expense category must be one of: ${AvailableExpenseCategories.join(
              ", "
            )}.`
          );
        }
        return true;
      }),
    body("amount")
      .optional()
      .isNumeric()
      .withMessage("Amount must be a number.")
      .custom((value) => value > 0)
      .withMessage("Amount must be greater than 0."),
    body("date")
      .optional()
      .isISO8601()
      .withMessage("Date must be a valid date.")
      .custom((value) => {
        const inputDate = new Date(value);
        const now = new Date();
        return inputDate.getTime() <= now.getTime();
      })
      .withMessage("Date must be in the past or present."),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("transaction description must be at lease 3 characters."),
  ];
};
