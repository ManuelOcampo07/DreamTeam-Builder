import { Router } from "express";
import { validationResult } from "express-validator";
import {
  getAllTeams,
  getTeamById,
  addNewTeam,
  updateTeam,
  deleteTeam,
} from "../models/teamsModel.js";
import {
  validateTeamCreate,
  validateTeamUpdate,
} from "../middlewares/teamsValidator.js";

const router = Router();

// GET /api/teams
router.get("/", async (req, res, next) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (e) {
    next(e);
  }
});

// GET /api/teams/:id
router.get("/:id", async (req, res, next) => {
  try {
    const team = await getTeamById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (e) {
    next(e);
  }
});

// POST /api/teams
router.post("/", validateTeamCreate, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const created = await addNewTeam(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// PUT /api/teams/:id
router.put("/:id", validateTeamUpdate, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const updated = await updateTeam(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Team not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /api/teams/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const ok = await deleteTeam(req.params.id);
    if (!ok) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted" });
  } catch (e) {
    next(e);
  }
});

export default router;
