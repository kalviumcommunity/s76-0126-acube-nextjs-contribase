import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set. Database operations will fail.');
}

let cached: { conn: typeof mongoose | null } = (global as any)._mongoose || { conn: null };

export async function connect() {
  if (cached.conn) return cached.conn;

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser and useUnifiedTopology are defaults in mongoose v6+
    } as any);
    cached.conn = conn;
    (global as any)._mongoose = cached;
    return conn;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export default connect;
