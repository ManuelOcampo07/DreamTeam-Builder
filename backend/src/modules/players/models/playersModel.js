import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    full_name: { type: String, trim:true },
    birth_date: { type: Date },
    age: { type: Number },
    height_cm: { type: Number },
    weight_kgs: { type: Number },
    positions: { type: String },
    nationality: { type: String, index: true },
    overall_rating: { type: Number, index: true },
    potential: { type: Number },
    value_euro: { type: Number, index: true },
    wage_euro: { type: Number },
    preferred_foot: { type: String },
    club_team: { type: String, index: true },
  },
  { timestamps: true, strict: false }
);

// text search index for player lookup
PlayerSchema.index({
  full_name: "text",
  name: "text",
  club_team: "text",
  nationality: "text",
});

const Player = mongoose.model("Player", PlayerSchema);

/**
 * Retrieves all players based on a query.
 * Supports search, sorting, and pagination.
 */
export async function getAllPlayers(query = {}) {
  const { search, sortBy, sortOrder = "desc", page = 1, limit = 20 } = query;

  const filter = {};
  if (search) {
    filter.$text = { $search: search };
  }

  const sort = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  return Player.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit, 10));
}

/**
 * Retrieves a single player by their ID.
 */
export async function getPlayerById(id) {
  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Player.findById(id);
}

/**
 * Adds a new player to the database.
 */
export async function addNewPlayer(payload) {
  const newPlayer = new Player(payload);
  return newPlayer.save();
}

/**
 * Updates an existing player by their ID.
 */
export async function updatePlayer(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Player.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Ensure new data meets schema requirements
  });
}

/**
 * Deletes a player by their ID.
 */
export async function deletePlayer(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const result = await Player.findByIdAndDelete(id);
  return !!result; // Return true if a document was deleted, otherwise false
}
