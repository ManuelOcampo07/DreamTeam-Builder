import Player from "../models/Player.js";

export async function getPlayers(req, res) {
  try {
    const {
      q,
      country,
      club,
      pos,
      minOverall,
      maxAge,
      sort = "-overall_rating",
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};
    if (q?.trim()) query.$text = { $search: q.trim() };
    if (country) query.nationality = country;
    if (club) query.club_team = club;
    if (pos) query.positions = new RegExp(`\\b${pos}\\b`, "i");
    if (minOverall) query.overall_rating = { $gte: Number(minOverall) };
    if (maxAge) query.age = { ...(query.age || {}), $lte: Number(maxAge) };

    const sortObj = {};
    for (const k of String(sort).split(",")) {
      if (!k) continue;
      sortObj[k.replace("-", "")] = k.startsWith("-") ? -1 : 1;
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));

    const [items, total] = await Promise.all([
      Player.find(query)
        .sort(sortObj)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .select("id _id name age height_cm weight_kgs positions nationality club_team"),
      Player.countDocuments(query),
    ]);

    const mappedItems = items.map((item, index) => ({
      ...item.toObject(),
      sequentialId: (pageNum - 1) * limitNum + index + 1,
    }));

    res.json({
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
        sort: sortObj,
        queryApplied: query,
      },
      data: mappedItems,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch players" });
  }
}

export async function getPlayerById(req, res) {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.json(player);
  } catch {
    res.status(400).json({ error: "Invalid player ID" });
  }
}

export async function createPlayer(req, res) {
  try {
    const created = await Player.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function updatePlayer(req, res) {
  try {
    const updated = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Player not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function deletePlayer(req, res) {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Player not found" });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid player ID" });
  }
}
