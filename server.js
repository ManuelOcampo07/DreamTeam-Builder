const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => res.send("DreamTeam Builder"));
app.get("/players", (_req, res) => res.send("Get all players "));
app.get("/players/:id", (req, res) => res.send(`Get player ${req.params.id}`));
app.post("/players", (_req, res) => res.send("Create player"));
app.delete("/players/:id", (req, res) => res.send(`Delete player ${req.params.id}`));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
