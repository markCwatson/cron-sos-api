const { MongoClient } = require('mongodb');

const setupDatabaseConnection = async () => {
  const user = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const host = process.env.MONGO_HOST;
  const name = process.env.MONGO_DB_NAME;

  const url = `mongodb://${user}:${password}@${host}:27017`;
  const client = new MongoClient(url);

  await client.connect();

  return { client, db: client.db(name) };
};

module.exports = {
  instance: null,
  async getInstance() {
    if (this.instance === null) {
      this.instance = await setupDatabaseConnection();
    }
    return this.instance;
  },
};
