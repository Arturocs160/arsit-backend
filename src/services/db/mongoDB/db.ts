import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Connection URL
const url = process.env.URL_MONGODB;
const dbName = 'arsit';

let instance: MongoClient | null = null;

async function connect() {
  if (!instance) {
    instance = new MongoClient(url!);
    await instance.connect();
    console.log('Conectado exitosamente a la base de datos');
  }
  return instance.db(dbName);
}

export { connect };
