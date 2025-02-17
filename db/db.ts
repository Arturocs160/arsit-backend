import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'arsit';

async function connect() {
  await client.connect();
  console.log('Conectado exitosamente a la base de datos');
  return client.db(dbName);
}

export { connect, client };
