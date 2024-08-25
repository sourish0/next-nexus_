import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function connectToDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    try {
      console.log('Connected to MongoDB')
    }
    catch(err){
      console.log('unable to connect')
    }
  }

  const db = client.db(process.env.MONGODB_DB);
  return db;
}

export default connectToDB;
