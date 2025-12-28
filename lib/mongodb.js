import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(process.env.MONGO_URI)
    .then(m => m);

  cached.conn = await cached.promise;
  return cached.conn;
}
