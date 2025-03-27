import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'arsit';

let instance: MongoClient | null = null;

async function connect() {
  if (!instance) {
    instance = new MongoClient(url);
    await instance.connect();
    console.log('Conectado exitosamente a la base de datos');
  }
  return instance.db(dbName);
}

export { connect };
