import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

// 👇 global cache (VERY IMPORTANT for Next.js)
let cached = (global as any).mongoose || {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing DB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "on-boarding", // you can change this
    });
  }

  cached.conn = await cached.promise;

  console.log("🔥 MongoDB Connected Successfully!");

  return cached.conn;
}