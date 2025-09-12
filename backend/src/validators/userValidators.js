import { param, body } from "express-validator";

export const updateUserValidator = () => {
  return [
    param("id").isMongoId().withMessage("User ID is invalid."),
    body("avatar")
      .optional()
      .isURL()
      .withMessage("Avatar must be a valid URL."),
    body("fullName")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Full name must be at lease 3 characters."),
    body("email").optional().isEmail().withMessage("Email is invalid."),
  ];
};
