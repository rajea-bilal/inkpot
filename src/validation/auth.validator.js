import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  // If there are errors, STOP HERE. Send a 400 Bad Request error back to the user right away.
  res.status(400).json({
    errors: errors.array(), // Send them the list of what they did wrong
  });
};

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("username should be a string"),
  body("email")
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("email should be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage("password should be between 6 and 12 characters"),
  validate,
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please provide a valid email"),

  body("password").notEmpty().withMessage("password is required"),
  validate,
];
