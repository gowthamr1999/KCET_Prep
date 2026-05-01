import { MongoClient } from 'mongodb';

let client;
let clientPromise;

function getClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable. Add it in Vercel project settings or .env.local.');
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === 'development') {
    // In development, reuse the client across hot-reloads.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export default getClientPromise;

export const DB_NAME = 'mock_papers';
export const DAILY_QUEST_COLLECTION = 'daily_quest';
