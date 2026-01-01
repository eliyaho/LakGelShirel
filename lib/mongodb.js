// lib/mongodb.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI לא מוגדר – החיבור למסד יתבצע רק בזמן runtime");
    return null; // לא נזרקת שגיאה בזמן build
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
