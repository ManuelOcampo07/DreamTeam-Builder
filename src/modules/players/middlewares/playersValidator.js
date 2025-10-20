import { body } from "express-validator";

export const validatePlayerCreate = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("position").trim().notEmpty().withMessage("Position is required"),
  body("nation").trim().notEmpty().withMessage("Nation is required"),
  body("club").trim().notEmpty().withMessage("Club is required"),
  body("rating")
    .isInt({ min: 0, max: 100 })
    .withMessage("Rating must be an integer 0–100"),
];

export const validatePlayerUpdate = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("position").optional().isString(),
  body("nation").optional().isString(),
  body("club").optional().isString(),
  body("rating").optional().isInt({ min: 0, max: 100 }),
];
