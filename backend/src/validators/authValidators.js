import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("avatar")
      .optional()
      .isURL()
      .withMessage("Avatar must be a valid URL."),
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required.")
      .isLength({ min: 3 })
      .withMessage("Full name must be at lease 3 characters."),
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email is invalid."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ];
};

export const loginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email is invalid."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ];
};
