import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function connectDB() {
  try {
    // Try connecting to local MongoDB first
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vidya-vriksha');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.warn('Local MongoDB unavailable, falling back to in-memory DB');
    
    // Fallback to in-memory MongoDB
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
  }
}
