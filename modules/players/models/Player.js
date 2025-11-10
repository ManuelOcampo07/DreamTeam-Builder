import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    id: { type: Number, index: true },
    name: { type: String, trim: true },
    full_name: { type: String, trim: true },
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

export default mongoose.model("Player", PlayerSchema);
