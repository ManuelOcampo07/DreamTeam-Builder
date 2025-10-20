import csv from "csvtojson";
import fs from "fs";

const input = "./src/data/fifa_cleaned.csv";
const output = "./src/data/players.json";

const pick = (row, keys) => {
  for (const key of keys) {
    const foundKey = Object.keys(row).find(
      (k) => k.toLowerCase() === key.toLowerCase()
    );
    if (foundKey && String(row[foundKey]).trim() !== "") {
      return row[foundKey];
    }
  }
  return undefined;
};

csv()
  .fromFile(input)
  .then((rows) => {
    if (!rows.length) {
      console.error("Error: CSV file is empty.");
      process.exit(1);
    }

    const mapped = rows.map((r, i) => {
      const name =
        pick(r, ["long_name", "short_name", "Name", "name"]) || "Unknown";

      let position =
        pick(r, ["player_positions", "Position", "position", "Preferred Positions"]);
      if (position && typeof position === "string") {
        position = position.split(",")[0].trim();
      }

      const nation =
        pick(r, [
          "nationality_name",
          "Nationality",
          "nationality",
          "Nation",
          "nation",
        ]) || "N/A";

      const club =
        pick(r, [
          "club_name",
          "Club",
          "club",
          "team",
          "team_name",
          "Current Club",
        ]) || "Free Agent";

      const ratingRaw =
        pick(r, [
          "overall",
          "Overall",
          "overall_rating",
          "Rating",
          "rating",
          "Overall Rating",
        ]) || 0;

      const rating = Number(ratingRaw);

      return {
        id: i + 1,
        name,
        position: position || "N/A",
        nation,
        club,
        rating: Number.isFinite(rating) ? rating : 0,
      };
    });

    const simplified = mapped
      .filter((p) => p.name !== "Unknown")
      .sort((a, b) => b.rating - a.rating);

    fs.writeFileSync(output, JSON.stringify(simplified, null, 2), "utf8");

    console.log(`Converted ${simplified.length} players → ${output}`);
    console.log("Sample:", simplified[0]);
  })
  .catch((err) => console.error("Error during conversion:", err));
