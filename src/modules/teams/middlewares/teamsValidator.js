import { body } from "express-validator";

const validFormations = [
  "4-3-3",
  "4-2-3-1",
  "3-5-2",
  "4-4-2",
  "5-3-2",
  "4-1-4-1",
];

export const validateTeamCreate = [
  body("name").trim().notEmpty().withMessage("Team name is required"),
  body("formation")
    .trim()
    .isIn(validFormations)
    .withMessage(`Formation must be one of: ${validFormations.join(", ")}`),
  body("players")
    .optional()
    .isArray({ min: 0, max: 11 })
    .withMessage("Players must be an array (max 11)"),
  body("players.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each player id must be a positive integer"),
];

export const validateTeamUpdate = [
  body("name").optional().isString(),
  body("formation").optional().isIn(validFormations),
  body("players").optional().isArray({ min: 0, max: 11 }),
  body("players.*").optional().isInt({ min: 1 }),
];
