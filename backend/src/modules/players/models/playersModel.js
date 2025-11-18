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

PlayerSchema.index({
  full_name: "text",
  name: "text",
  club_team: "text",
  nationality: "text",
});

const Player = mongoose.model("Player", PlayerSchema);

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

export async function getPlayerById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Player.findById(id);
}

export async function addNewPlayer(payload) {
  const newPlayer = new Player(payload);
  return newPlayer.save();
}

export async function updatePlayer(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Player.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deletePlayer(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const result = await Player.findByIdAndDelete(id);
  return !!result;
}
