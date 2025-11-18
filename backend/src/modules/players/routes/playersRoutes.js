import { Router } from "express";
import { validationResult } from "express-validator";
import {
  getAllPlayers,
  getPlayerById,
  addNewPlayer,
  updatePlayer,
  deletePlayer,
} from "../models/playersModel.js";
import {
  validatePlayerCreate,
  validatePlayerUpdate,
} from "../middlewares/playersValidator.js";

const router = Router();

// GET /api/players
router.get("/", async (req, res, next) => {
  try {
    const players = await getAllPlayers(req.query);
    res.json(players);
  } catch (e) {
    next(e);
  }
});

// GET /api/players/:id
router.get("/:id", async (req, res, next) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (e) {
    next(e);
  }
});

// POST /api/players
router.post("/", validatePlayerCreate, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const created = await addNewPlayer(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// PUT /api/players/:id
router.put("/:id", validatePlayerUpdate, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const updated = await updatePlayer(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Player not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /api/players/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const ok = await deletePlayer(req.params.id);
    if (!ok) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (e) {
    next(e);
  }
});

export default router;
