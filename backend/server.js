import "dotenv/config";
import express from "express";
import cors from "cors"; // Import cors
import { connectDB } from "./shared/middlewares/connect-db.js";
import playersRouter from "./modules/players/players.routes.js";

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware
app.use(connectDB);

app.use("/api/players", playersRouter);

app.get("/", (_req, res) => res.send("DreamTeam Builder API v3 is running"));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
