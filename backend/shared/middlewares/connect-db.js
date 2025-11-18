import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(_req, _res, next) {
  try {
    if (isConnected) return next();

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGODB_URI in .env");

    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
    next();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    return _res.status(500).json({ error: "Database connection error" });
  }
}
