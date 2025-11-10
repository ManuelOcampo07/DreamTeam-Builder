import express from "express";
import playersRoutes from "./src/modules/players/routes/playersRoutes.js";
import teamsRoutes from "./src/modules/teams/routes/teamsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// App-level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api/players", playersRoutes);
app.use("/api/teams", teamsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler 
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
