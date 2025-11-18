import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../../data/teams.json");

// Helpers
async function readAll() {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeAll(list) {
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf8");
}

export async function getAllTeams() {
  return await readAll();
}

export async function getTeamById(id) {
  const list = await readAll();
  return list.find((t) => String(t.id) === String(id));
}

export async function addNewTeam(payload) {
  const list = await readAll();
  const newId = Date.now();
  const team = {
    id: newId,
    name: payload.name,
    formation: payload.formation,
    players: payload.players || [], // array de ids
  };
  list.push(team);
  await writeAll(list);
  return team;
}

export async function updateTeam(id, data) {
  const list = await readAll();
  const idx = list.findIndex((t) => String(t.id) === String(id));
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data, id: list[idx].id };
  await writeAll(list);
  return list[idx];
}

export async function deleteTeam(id) {
  const list = await readAll();
  const newList = list.filter((t) => String(t.id) !== String(id));
  const changed = newList.length !== list.length;
  if (changed) await writeAll(newList);
  return changed;
}
